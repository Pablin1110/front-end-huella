import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  name: string;
  lastname: string;
  email: string;
  uid: string;
  public users: any;
  constructor(public authservice: AuthService, public actionSheetController: ActionSheetController,private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
