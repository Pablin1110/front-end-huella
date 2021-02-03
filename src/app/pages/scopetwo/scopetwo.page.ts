import { Component, Input, OnInit } from '@angular/core';
import { ScopetwoService } from '../../services/scopetwo.service';
import { AuthService } from '../../services/auth.service';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { Scopetwo } from '../../interfaces/scopetwo';
import { UpdateScopetwoPage } from './update-scopetwo/update-scopetwo.page';
import { CarbonService } from '../../services/carbon.service';
import { ScopeoneService } from '../../services/scopeone.service';

@Component({
  selector: 'app-scopetwo',
  templateUrl: './scopetwo.page.html',
  styleUrls: ['./scopetwo.page.scss'],
})
export class ScopetwoPage implements OnInit {

  @Input() scopetwos: Scopetwo[] = [];
  public scope: any = [];
  public  organization: number;
  isUpdate = false;
  constructor(private scopetwoService: ScopetwoService, public authservice: AuthService,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private modalController: ModalController,
              private alertCtrl: AlertController,
              private carbonService: CarbonService,
              private scopeoneService: ScopeoneService, ) { }

  ngOnInit() {
    this.organization = this.navParams.get('scopetwo');
    this.getScopeTwo();
  }
  async dismissScopeOne() {
    await this.modalCtrl.dismiss();
  }
  doSomething(event){
    this.getScopeTwo();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  getAllScopeTwo() {
    try {
      let orgTemp: Scopetwo = null;
      this.scopetwoService.getAllScopeTwo()
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
getScopeTwo() {
 this.scope = [];
 try {
      let orgTemp: Scopetwo = null;
      this.scopetwoService.getScopeTwo(this.organization)
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
  addScopeTwo(){
    this.modalController.create({
      component: UpdateScopetwoPage,
      componentProps: {
        scopedos: this.organization,
     }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'AlcancedosCreada'){
        this.scopetwos.push(data);
        this.getScopeTwo();
      }
    });
  }
  updateScopeTwo(scopetwo: Scopetwo){
    this.modalController.create({
      component: UpdateScopetwoPage,
      componentProps: {scopetwo, scopeoneupdate: this.organization}
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'AlcancedosModificada'){
        this.scopetwos = this.scopetwos.filter(std => {
          if (data.id === std.id){
            return data;
          }
          return std;
        });
      }
    });
  }
  async confirmationDelete(scopetwo: Scopetwo) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      subHeader: '¿Esta seguro que desea eliminar el alcance dos?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.deleteScopeTwo(scopetwo);
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
  deleteScopeTwo(scopetwo: Scopetwo) {
    this.scopetwoService.deleteScopeTwo(scopetwo.id)
    .subscribe((data) => {
      this.getScopeTwo();
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
            sumoneemisiones = (sumoneemisiones - sumone.data[i].emisiones_totales);
           }
          }
          console.log(sumoneemisiones);
          if (sumtwo.data.length === 0){
            sumtwoemisiones = 0;
        }else{
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < sumtwo.data.length; i++){
            sumtwoemisiones = (sumtwoemisiones - sumtwo.data[i].emisiones_totales);
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
       async showAlert(periodo_inicial: Date, periodo_final: Date, ubicacion: string, nombre: string, consumo: number, factor_emision: number, emision_total: number) {
        const alert = await this.alertCtrl.create({
          header: 'Descripción',
          message: 'Periodo inicial: ' + periodo_inicial + '<br/>Periodo final: ' + periodo_final + '<br/>Ubicación: ' + ubicacion +
          // tslint:disable-next-line: max-line-length
          '<br/>Nombre: ' + nombre + '<br/>Consumo: ' + consumo + '<br/>Factor de emisión: ' + factor_emision + '<br/>Emisión total: ' + emision_total,
          buttons: ['Aceptar']
        });
        await alert.present();
      }
      getScopeTwoInfo(id: number) {
        try {
          let orgTemp: Scopetwo = null;
          this.scopetwoService.getScopeTwoInfo(id)
            .subscribe(data => {
              // tslint:disable-next-line: prefer-for-of
              for (let i = 0; i < data.data.length; i++){
                orgTemp = data.data[i];
              }
              // tslint:disable-next-line: max-line-length
              this.showAlert(orgTemp.periodo_inicial, orgTemp.periodo_final, orgTemp.ubicacion, orgTemp.nombre, orgTemp.consumo, orgTemp.factor_emision, orgTemp.emisiones_totales);
            });
        } catch (error) {
          console.log('Error getOrganization ->', error);
        }
         }

}
