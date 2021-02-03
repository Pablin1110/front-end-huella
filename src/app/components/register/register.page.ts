import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  public name: string;
  public lastname: string;
  public email: string;
  public password: string;
  public confirm_password: string;
  constructor(private auth: AuthService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
  }
  async register(){
    if(this.name === undefined){
      console.log('nombre');
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el nombre',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if(this.lastname === undefined){
      console.log('apellido');
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el apellido',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if(this.email === undefined){
      console.log('email');
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el correo electrónico',
        duration: 2000,
        position: 'bottom'
      });
    }else if(this.password === undefined){
      console.log('contraseña');
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la contraseña',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if(this.confirm_password === undefined){
      console.log('Repetir'+this.confirm_password);
      
      const toast = this.toastCtrl.create({
        message: 'Por favor repetir la contraseña',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if(this.confirm_password !== this.password){
      console.log('no son iguales');
      const toast = this.toastCtrl.create({
        message: 'La contraseñas no son las mismas',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
      console.log('Se registro');
      this.OnSubmitRegister();
      const toast = this.toastCtrl.create({
        message: 'Registrado',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }
  }
  OnSubmitRegister(){
      this.auth.register(this.email, this.password,this.name,this.lastname).then(auth => {
        this.router.navigate(['/tabs/principal']);
        console.log(auth);
      }).catch(err => console.log(err));
    }
}
