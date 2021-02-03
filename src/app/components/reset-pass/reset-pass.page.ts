import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  public email: string;

  signupForm: FormGroup;

  constructor(private authService: AuthService, private builder: FormBuilder, public router: Router, private toastCtrl: ToastController) {
    this.signupForm = this.builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])] ,
    });
   }

  ngOnInit() {
  }
  async sendLinkReset(){
    if(this.email !== undefined){
      this.authService.resetPassword(this.email).then( async ()=>{
        const toast = this.toastCtrl.create({
          message: 'Por favor ingresar la contraseña',
          duration: 2000,
          position: 'bottom'
        });
        (await toast).present();
      }).catch( async () => {
        const toast = this.toastCtrl.create({
          message: 'El correo electrónico ingresado no existe',
          duration: 2000,
          position: 'bottom'
        });
        (await toast).present();
      });
    }else{
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el correo electrónico',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }
  }

}
