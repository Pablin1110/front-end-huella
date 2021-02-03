import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ScopeoneService } from 'src/app/services/scopeone.service';
import {Scopeone} from 'src/app/interfaces/scopeone';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { UpdateScopeonePage } from './update-scopeone/update-scopeone.page';
import { ScopetwoService } from '../../services/scopetwo.service';
import { CarbonService } from '../../services/carbon.service';


@Component({
  selector: 'app-scopeone',
  templateUrl: './scopeone.page.html',
  styleUrls: ['./scopeone.page.scss'],
})
export class ScopeonePage implements OnInit {

  @Input() scopeones: Scopeone[] = [];
  public scope: any = [];
  public  organization: number;
  isUpdate = false;
  constructor( private scopeoneService: ScopeoneService, public authservice: AuthService,
               public navParams: NavParams,
               private modalCtrl: ModalController,
               private modalController: ModalController,
               private alertCtrl: AlertController,
               private scopetwoService: ScopetwoService,
               private carbonService: CarbonService,

               ) { }

  ngOnInit() {
    // this.getAllScopeOne();
    this.organization = this.navParams.get('scopeone');
    this.getScopeOne();
  }
  doSomething(event){
    this.getScopeOne();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async dismissScopeOne() {
    await this.modalCtrl.dismiss();
  }
  getAllScopeOne() {
    try {
      let orgTemp: Scopeone = null;
      this.scopeoneService.getAllScopeOne()
    .subscribe(data => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.data.length; i++){
        orgTemp = data.data[i];
        this.scope.push(orgTemp);
      }
    });
    } catch (error) {
      console.log('Error getOrganization ->', error);
    }
  }
getScopeOne() {
 this.scope = [];
 try {
      let orgTemp: Scopeone = null;
      this.scopeoneService.getScopeOne(this.organization)
        .subscribe(data => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.data.length; i++){
            orgTemp = data.data[i];
            this.scope.push(orgTemp);
          }
        });
    } catch (error) {
      console.log('Error getOrganization ->', error);
    }
  }
  addScopeone(){
    this.modalController.create({
      component: UpdateScopeonePage,
      componentProps: {
        scopeOne: this.organization,
     }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'AlcanceunoCreada'){
        this.scopeones.push(data);
        this.getScopeOne();
      }
    });
  }
  updateScopeone(scopeone: Scopeone){
    this.modalController.create({
      component: UpdateScopeonePage,
      componentProps: {scopeone, scopeoneupdate: this.organization}

    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'AlcanceunoModificada'){
        this.scopeones = this.scopeones.filter(std => {
          if (data.id === std.id){
            return data;
          }
          return std;
        });
      }
    });
  }
  async confirmationDelete(scopeone: Scopeone) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      subHeader: '¿Esta seguro que desea eliminar el alcance uno?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.deleteScopeone(scopeone);
            this.getCarbonScope();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
      ]
    });
    await alert.present();
  }
  deleteScopeone(scopeone: Scopeone) {
    this.scopeoneService.deleteScopeOne(scopeone.id)
    .subscribe((data) => {
      this.getScopeOne();
    });
  }
  getCarbonScope(){
    let sumoneemisiones = 0;
    let sumtwoemisiones = 0;
    this.getSumScopeone().subscribe(sumone => {
      this.getSumScopetwo().subscribe(sumtwo => {
          // tslint:disable-next-line: prefer-for-of
          if (sumone.data.length === 0){
            sumoneemisiones = 0;
        }else{
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < sumone.data.length; i++){
            sumoneemisiones = (-sumoneemisiones - sumone.data[i].emisiones_totales);
            console.log(sumoneemisiones);
           }
          }
    
          if (sumtwo.data.length === 0){
            sumtwoemisiones = 0;
        }else{
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < sumtwo.data.length; i++){
            sumtwoemisiones = (-sumtwoemisiones - sumtwo.data[i].emisiones_totales);
          }
        }
          console.log(sumtwoemisiones);
          this.updateCarbon(sumoneemisiones * -1, sumtwoemisiones * -1, this.organization);
          console.log('Huella modificada');
      });
    });
  }
  getSumScopeone(){
      try {
        return this.scopeoneService.getSumScopeOne(this.organization);
          } catch (error) {
             console.log('Error getOrganization ->', error);
          }
    // tslint:disable-next-line: align
  }
  updateCarbon(alcance_uno: number, alcance_dos: number, id: number){
    try {
      return this.carbonService.updateFootC(alcance_uno, alcance_dos,  id).subscribe(data => {
      });
         } catch (error) {
           console.log('Error getOrganization ->', error);
         }
       }
  getSumScopetwo(){

      try {
        return this.scopetwoService.getSumScopeTwo(this.organization);
           } catch (error) {
             console.log('Error getOrganization ->', error);
           }
       }

       // tslint:disable-next-line: max-line-length
       async showAlert(lugar: string, equipo: string, cantidad_inicial: number, cantidad_anual: number, factor_emision: number, emision_total: number) {
        const alert = await this.alertCtrl.create({
          header: 'Descripción',
          message: 'Lugar: ' + lugar + '<br/>Equipo: ' + equipo + '<br/>Cantidad inicial: ' + cantidad_inicial +
          '<br/>Cantidad anual: ' + cantidad_anual + '<br/>Factor de emisión: ' + factor_emision + '<br/>Emisión total: ' + emision_total,
          buttons: ['Aceptar']
        });
        await alert.present();
      }
      getScopeOneInfo(id: number) {
        try {
             let orgTemp: Scopeone = null;
             this.scopeoneService.getScopeOneInfo(id)
               .subscribe(data => {
                 // tslint:disable-next-line: prefer-for-of
                 for (let i = 0; i < data.data.length; i++){
                   orgTemp = data.data[i];
                 }
                 // tslint:disable-next-line: max-line-length
                 this.showAlert(orgTemp.lugar, orgTemp.equipo, orgTemp.cantidad_inicial, orgTemp.cantidad_anual, orgTemp.factor_emision, orgTemp.emisiones_totales);
               });
           } catch (error) {
             console.log('Error getOrganization ->', error);
           }
         }
}
