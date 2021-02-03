import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams, AlertController, ToastController } from '@ionic/angular';
import { ScopetwoService } from '../../../services/scopetwo.service';
import { Scopetwo } from '../../../interfaces/scopetwo';
import { NgForm } from '@angular/forms';
import { ScopeoneService } from '../../../services/scopeone.service';
import { CarbonService } from '../../../services/carbon.service';

@Component({
  selector: 'app-update-scopetwo',
  templateUrl: './update-scopetwo.page.html',
  styleUrls: ['./update-scopetwo.page.scss'],
})
export class UpdateScopetwoPage implements OnInit {

  @Input() scopetwo: Scopetwo;
  isUpdate = false;
  usuario_id_update: number;
  usuario_id: number;
  periodo_inicial: Date;
  periodo_final: Date;
  consumo: number;
  factor_emision: number = 0.000198;
  emisiones_totales: number ;
  data = {
    usuario_id: 0,
    periodo_inicial: new Date(),
    periodo_final: new Date(),
    ubicacion: '',
    nombre: 'Arconel',
    consumo: 0,
    factor_emision: 0,
    emisiones_totales: 0,
  };
  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private scopetwoService: ScopetwoService,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private scopeoneService: ScopeoneService,
    private carbonService: CarbonService,
    private toastCtrl: ToastController
  ) {
    //proveedor de energia 
   // Arconel 
   //198.34 g CO2 eq/ kWh
   }

  ngOnInit() {
    this.usuario_id = this.navParams.get('scopedos');
    this.usuario_id_update = this.navParams.get('scopeoneupdate');
    if (this.scopetwo) {
      this.isUpdate = true;
      this.data = this.scopetwo;
    }
  }
  async dismissScopetwo() {
    await this.modalController.dismiss();
  }
  OnSubmit(form: NgForm){
    const scopetwo = form.value;
    if (this.isUpdate === true) {
      this.OnSubmitUpdate(scopetwo);
    }else{

      this.OnSubmitAdd(scopetwo);
    }
  }
  async OnSubmitAdd(scopetwo: Scopetwo){
    if (this.periodo_inicial === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el periodo inicial',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if ( this.periodo_final === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el periodo final',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.ubicacion === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la ubicación',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.nombre === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el nombre de la empresa eléctrica',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.consumo === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el consumo',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.factor_emision === undefined ){
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
      this.addScopetwo(scopetwo);
      this.getScopeOne().subscribe(one => {
        this.getScopeTwo().subscribe(two => {
          this.getCarbon().subscribe(carbon =>{
          if (one.data.length === 0 && two.data.length === 0 && carbon.data.length === 0){
               this.addCarbon(this.usuario_id, 0, this.emisiones_totales);
               console.log('Huella ingresada');
          }else{
            this.getCarbonScope();
          }
        });
        });
      });
    }
  }
  async OnSubmitUpdate(scopetwo: Scopetwo){
    if (this.data.periodo_inicial === undefined ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el periodo inicial',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.periodo_final === undefined ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el periodo final',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.ubicacion === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la ubicación',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.nombre === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el nombre de la empresa eléctrica',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.consumo === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el consumo',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.factor_emision === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el factor de emisión',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.emisiones_totales === undefined ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la emisión total',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
     this.confirmationUpdate(scopetwo);
    }
  }
  addScopetwo(scopetwo: Scopetwo){
    this.scopetwoService.storeScopeTwo(scopetwo).subscribe(response => {
      this.modalController.dismiss(response, 'AlcancedosCreada');
    });
  }
  async confirmationUpdate(scopetwo: Scopetwo) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      subHeader: '¿Esta seguro que desea modificar el alcance dos?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.updateScope(scopetwo);
            this.getCarbonScope();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.dismissScopetwo();
          }
        },
      ]
    });
    await alert.present();
  }
  updateScope(scopetwo: Scopetwo) {
    this.scopetwoService.updateScopeT(scopetwo, this.scopetwo.id).subscribe(() => {
      scopetwo.id = this.scopetwo.id;
      this.modalController.dismiss(scopetwo, 'AlcancedosModificada');
    });
  }
  getSumScopeone(){
    if(this.isUpdate === true){
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
       updateCarbon(alcance_uno: number, alcance_dos: number, id: number){
        try {
          return this.carbonService.updateFootC(alcance_uno, alcance_dos,  id).subscribe(data =>{
          });
             } catch (error) {
               console.log('Error getOrganization ->', error);
             }
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
                        console.log(sumtwoemisiones * -1);
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
  addCarbon(usuario_id: number, alcance_uno: number, alcance_dos: number){
    this.carbonService.storeFoot(usuario_id, alcance_uno, alcance_dos).subscribe(carbon => {
    });
  }
  getCarbon(){
    try {
      return this.carbonService.getCarbonScope(this.usuario_id);
         } catch (error) {
           console.log('Error getOrganization ->', error);
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
  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'Se debe ingresar la "Fecha inicial", ' +
      // tslint:disable-next-line: max-line-length
      '"Fecha final" '+', "Ubicación"y el "Consumo" de la empresa Arconel.' ,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
