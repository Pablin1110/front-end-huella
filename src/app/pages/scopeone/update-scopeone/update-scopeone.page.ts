import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {Scopeone} from 'src/app/interfaces/scopeone';
import { ScopeoneService } from 'src/app/services/scopeone.service';
import { CarbonService } from '../../../services/carbon.service';
import { Scopetwo } from '../../../interfaces/scopetwo';
import { ScopetwoService } from '../../../services/scopetwo.service';
import { Sumscopeone } from '../../../interfaces/sumscopeone';

@Component({
  selector: 'app-update-scopeone',
  templateUrl: './update-scopeone.page.html',
  styleUrls: ['./update-scopeone.page.scss'],
})
export class UpdateScopeonePage implements OnInit {

  @Input() scopeone: Scopeone;
  // tslint:disable-next-line: variable-name
  sumoneemisiones_totales: number;
  sumtwoemisiones_totales: number;
  isUpdate = false;
  public scope: any;
  public scopetwo: any = [];
  // tslint:disable-next-line: variable-name
  usuario_id: number;
  // tslint:disable-next-line: variable-name
  usuario_id_update: number;
  equipo: string;
  tipo: string ;
  cantidad_inicial: number;
  cantidad_anual: number;
  factor_emision: number;
  emisiones_totales: number;
  dataEqui: any[] = [];
  dataType: any[] = [];
  data = {
    usuario_id: 0,
    lugar: '',
    equipo: '',
    tipo: '',
    cantidad_inicial: 0,
    cantidad_anual: 0,
    factor_emision: 0,
    emisiones_totales: 0,
  };
  constructor( private modalController: ModalController,
               private platform: Platform,
               private scopeoneService: ScopeoneService,
               public navParams: NavParams,
               private alertCtrl: AlertController,
               private carbonService: CarbonService,
               private scopetwoService: ScopetwoService,
               private toastCtrl: ToastController) {
                this.platform.ready().then(() => {
                  this.dataEqui = [
                  {id: 1, name: 'Calefacción'},
                  {id: 2, name: 'Cocina'},
                  {id: 3, name: 'Calefón'},
                  {id: 4, name: 'Secadora'},
                  {id: 5, name: 'Maquinaria a diesel'},
                  {id: 6, name: 'Carbón normal'},
                  {id: 7, name: 'Aire acondicionado'},
                  {id: 8, name: 'Gas refrigerante'},
                  {id: 9, name: 'Automóvil Extra'},
                  {id: 10, name: 'Automóvil Super'},
                  {id: 11, name: 'Automóvil Diesel'}, ];
                });
                }

  ngOnInit() {
    this.usuario_id = this.navParams.get('scopeOne');
    this.usuario_id_update = this.navParams.get('scopeoneupdate');
    if (this.scopeone) {
      this.isUpdate = true;
      this.data = this.scopeone;
    }
  }

  async dismissScopeone() {
    await this.modalController.dismiss();
  }
  OnSubmit(form: NgForm){
    const scopeone = form.value;
    if (this.isUpdate === true) {
    this.OnSubmitUpdate(scopeone);
    }else{
      this.OnSubmitAdd(scopeone);
    }
  }
  async OnSubmitAdd(scopeone: Scopeone){
    if (this.data.lugar === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el lugar',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.equipo === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el equipo',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.tipo === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el tipo',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.cantidad_inicial === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la cantidad inicial',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.cantidad_anual === undefined ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la cantidad anual',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.factor_emision === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el factor de emisión',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.emisiones_totales === undefined ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la emisión total',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
      this.addScopeone(scopeone);
      this.getScopeOne().subscribe(one => {
        this.getScopeTwo().subscribe(two => {
          this.getCarbon().subscribe(carbon => {
          if (one.data.length === 0 && two.data.length === 0 && carbon.data.length === 0){
               this.addCarbon(this.usuario_id, this.emisiones_totales, 0);
               console.log('Huella ingresada');
          }else{
            // this.OnSubmitAdd(scopeone);
            this.getCarbonScope();
          }
        });
        });
      });
    }
  }
  async OnSubmitUpdate(scopeone: Scopeone){
    if (this.data.lugar === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el lugar',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.equipo === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el equipo',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if ( this.data.tipo === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el tipo',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if ( this.data.cantidad_inicial === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la cantidad inicial',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.cantidad_anual === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la cantidad anual',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if ( this.data.factor_emision === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el factor de emisión',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if ( this.data.emisiones_totales === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la emisión total',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
      this.confirmationUpdate(scopeone);
    }
  }
  OnChange(event){
    if (event.target.value === 'Calefacción'){
       this.tipo = 'GLP';
       this.data.tipo = 'GLP';
       this.factor_emision = 0.202;
       this.data.factor_emision = 0.202;
       if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Cocina'){
      this.tipo = 'GLP';
      this.data.tipo = 'GLP';
      this.factor_emision = 0.202;
      this.data.factor_emision = 0.202;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Calefón'){
      this.tipo = 'GLP';
      this.data.tipo = 'GLP';
      this.factor_emision = 0.202;
      this.data.factor_emision = 0.202;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Secadora'){
      this.tipo = 'GLP';
      this.data.tipo = 'GLP';
      this.factor_emision = 0.202;
      this.data.factor_emision = 0.202;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Maquinaria a diesel'){
      this.tipo = 'Gasoleo';
      this.data.tipo = 'Gasoleo';
      this.factor_emision = 2.868;
      this.data.factor_emision = 2.868;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Carbón normal'){
      this.tipo = 'Carbon nacional';
      this.data.tipo = 'Carbon nacional';
      this.factor_emision = 1.914;
      this.data.factor_emision = 1.914;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Aire acondicionado'){
      this.tipo = 'R-410A';
      this.data.tipo = 'R-410A';
      this.factor_emision = 2.088;
      this.data.factor_emision = 2.088;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Gas refrigerante'){
      this.tipo = 'HFC-32';
      this.data.tipo = 'HFC-32';
      this.factor_emision = 1.100;
      this.data.factor_emision = 1.100;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Automóvil Extra'){
      this.tipo = 'E5';
      this.data.tipo = 'E5';
      this.factor_emision = 2.180;
      this.data.factor_emision = 2.180;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Automóvil Super'){
      this.tipo = 'E10';
      this.data.tipo = 'E10';
      this.factor_emision = 2.065;
      this.data.factor_emision = 2.065;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }else if (event.target.value === 'Automóvil Diesel'){
      this.tipo = 'B7';
      this.data.tipo = 'B7';
      this.factor_emision = 2.467;
      this.data.factor_emision = 2.467;
      if (this.isUpdate === true) {
        if (this.data.cantidad_inicial !== undefined){
          this.data.emisiones_totales = this.data.cantidad_inicial * this.data.factor_emision;
         }
       }else{
        if (this.cantidad_inicial !== undefined){
          this.emisiones_totales = this.cantidad_inicial * this.factor_emision;
         }
       }
    }
  }
  OnChangeinicial(event){
    let emision = 0;
    if (this.isUpdate === true) {
      if (this.data.factor_emision === undefined){
        this.data.emisiones_totales = event.target.value;
      }else{
        emision = event.target.value * this.factor_emision;
        this.data.emisiones_totales = Math.round(emision * 100) / 100;
      }

    }else{
      if (this.factor_emision === undefined){
        this.emisiones_totales = event.target.value;
      }else{
        emision = event.target.value * this.factor_emision;
        this.emisiones_totales = Math.round(emision * 100) / 100;
      }
    }
  }
  addScopeone(scopeone: Scopeone){
    this.scopeoneService.storeScopeOne(scopeone).subscribe(response => {
      this.modalController.dismiss(response, 'AlcanceunoCreada');
    });
  }
  async confirmationUpdate(scopeone: Scopeone) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      subHeader: '¿Esta seguro que desea modificar el alcance uno?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.updateScope(scopeone);
            this.getCarbonScope();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.dismissScopeone();
          }
        },
      ]
    });
    await alert.present();
  }
  updateScope(scopeone: Scopeone) {

    this.scopeoneService.updateScopeO(scopeone, this.scopeone.id).subscribe(() => {
      scopeone.id = this.scopeone.id;
      this.modalController.dismiss(scopeone, 'AlcanceunoModificada');
    });
  }
  addCarbon(usuario_id: number, alcance_uno: number, alcance_dos: number){
    this.carbonService.storeFoot(usuario_id, alcance_uno, alcance_dos).subscribe(carbon => {
    });
  }
  getScopeOne(){
   try {
    return this.scopeoneService.getScopeOne(this.usuario_id);
       } catch (error) {
         console.log('Error getOrganization ->', error);
       }
     }
  getScopeTwo() {
      try {
           return this.scopetwoService.getScopeTwo(this.usuario_id);
         } catch (error) {
           console.log('Error getOrganization ->', error);
         }
       }
  getSumScopeone(){
    if (this.isUpdate === true){
      try {
        return this.scopeoneService.getSumScopeOne(this.usuario_id_update);
          } catch (error) {
             console.log('Error getOrganization ->', error);
          }
    // tslint:disable-next-line: align
    }else{
      try {
        return this.scopeoneService.getSumScopeOne(this.usuario_id);
           } catch (error) {
             console.log('Error getOrganization ->', error);
           }
         }
  }
  getSumScopetwo(){
    if (this.isUpdate === true){
      try {
        return this.scopetwoService.getSumScopeTwo(this.usuario_id_update);
           } catch (error) {
             console.log('Error getOrganization ->', error);
           }

    }else{
      try {
        return this.scopetwoService.getSumScopeTwo(this.usuario_id);
           } catch (error) {
             console.log('Error getOrganization ->', error);
           }

    }

       }
  getCarbonScope(){
    let sumoneemisiones = 0;
    let sumtwoemisiones = 0;
    this.getSumScopeone().subscribe(sumone => {
      this.getSumScopetwo().subscribe(sumtwo => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < sumone.data.length; i++){
            sumoneemisiones = (sumoneemisiones - sumone.data[i].emisiones_totales);
          }
          console.log(sumoneemisiones*-1);
          // tslint:disable-next-line: only-arrow-functions
          if (sumtwo.data.length === 0){
            sumtwoemisiones = 0;
        }else{
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < sumtwo.data.length; i++){
            sumtwoemisiones = (sumtwoemisiones - sumtwo.data[i].emisiones_totales);
          }
          console.log(sumtwoemisiones);
        }
          if (this.isUpdate === true){
          this.updateCarbon(sumoneemisiones * -1, sumtwoemisiones * -1, this.usuario_id_update);
          }else{
          this.updateCarbon(sumoneemisiones * -1, sumtwoemisiones * -1, this.usuario_id);
          }
          console.log('Huella modificada');
      });
    });
  }
  updateCarbon(alcance_uno: number, alcance_dos: number, id: number){
    try {
      return this.carbonService.updateFootC(alcance_uno, alcance_dos,  id).subscribe(data => {
      });
         } catch (error) {
           console.log('Error getOrganization ->', error);
         }
       }
   getCarbon(){
    try {
      return this.carbonService.getCarbonScope(this.usuario_id);
         } catch (error) {
           console.log('Error getOrganization ->', error);
         }
   }
   async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'Se debe ingresar el "Lugar", ' +
      // tslint:disable-next-line: max-line-length
      '"Equipo" '+', "Cantidad inicial es del último mes "y la "Cantidad anual".' ,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
