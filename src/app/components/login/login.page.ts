import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  signupForm: FormGroup;
  constructor(private authService: AuthService, private builder: FormBuilder, public router: Router, private toastCtrl: ToastController) {
    this.signupForm = this.builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])] ,
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  ngOnInit() {
  }
  async OnSubmitLogin(){

    if (this.email === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el correo electrónico',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.password === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la contraseña',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
      this.authService.login(this.email, this.password).then(res => {
        this.router.navigate(['/tabs/principal']);
        //this.authService.getToken();
      }).catch(async () => {
     const toast = this.toastCtrl.create({
          message: 'El correo electrónico ingresado no existe',
          duration: 2000,
          position: 'bottom'
        });
     (await toast).present();
      });
    }
    }


}
