import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public users: any;
  public email: string;
  public name: string;
  public lastname: string;
  constructor(public authservice: AuthService, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.OnUserAuth();
  }
  Onlogout(){
    this.authservice.logout();
    window.location.reload();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Cerrar sesión',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        }
      }],
    });
    await actionSheet.present();
  }
  OnUserAuth(){
    this.authservice.getUserAuth().subscribe((user) => {
      if (user){
        this.authservice.getUser(user.uid).subscribe(person => {
          this.users = person;
          this.name = this.users.name;
          this.lastname = this.users.lastname;
          this.email = user.email;
        });
      }
   });
 }


}
