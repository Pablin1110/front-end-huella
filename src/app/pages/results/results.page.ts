import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import {ChildActivationStart, Router} from '@angular/router';
import { Carbon } from '../../interfaces/carbon';
import { CarbonService } from 'src/app/services/carbon.service';
import {Organization} from 'src/app/interfaces/organization';
import { OrganizationService } from '../../services/organization.service';
import { ScopetwoService } from '../../services/scopetwo.service';
import { ScopeoneService } from '../../services/scopeone.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {


  @Input() carbons: Carbon[] = [];
  public carbon: any = [];
  public carbon2: any = [];
  public results: number;
  public  organization: number;
  public value: number;
  isUpdate = false;

  constructor(public authservice: AuthService, public actionSheetController: ActionSheetController,
              public router: Router, private carbonService: CarbonService,
              private alertCtrl: AlertController,
       ) { }

  ngOnInit() {
    this.getFoot();

  }
  doSomething(event){
    this.getFoot();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  getAllFoot() {
    try {
      let orgTemp: Carbon = null;
      this.carbonService.getAllFoot()
    .subscribe(data => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.data.length; i++){
        orgTemp = data.data[i];
        this.carbon.push(orgTemp);
      }
    });
    } catch (error) {
      console.log('Error getOrganization ->', error);
    }
  }
  getFoot(){
   this.carbon = [];
   try {
    let orgTemp: Carbon = null;
    this.authservice.getUserAuth().subscribe((user) => {
      this.carbonService.getFootID(user.uid)
      .subscribe(data => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.data.length; i++){
          orgTemp = data.data[i];
          this.carbon.push(orgTemp);
        }
        this.value = Math.round(((-orgTemp.alcance_uno - orgTemp.alcance_dos) * -1) * 100) / 100;
      });
    });
    } catch (error) {
      console.log('Error getOrganization ->', error);
    }
  }
  Onlogout(){
    this.authservice.logout();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Organización',
        icon: 'business',
        handler: () => {
          this.router.navigate(['/organization']);
        }
      },
      {
        text: 'Ayuda',
        icon: 'information-circle-outline',
        handler: () => {
          this.showAlert();
        }
      }],
    });
    await actionSheet.present();
  }
  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'En la pantalla "Resultados" muestra el cálculo de la Huella de Carbono.<br/>Para ingresar una organización debe: <br/>Presionar en el menú y "Organización"' ,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  OnChangeinicial(event){

  }
  async showAlertOutRange() {
    const alert = await this.alertCtrl.create({
      header: 'Fuera del rango:',
      message: 'Su empresa se encuentra fuera del rango de referencia para huella de carbono por tipo de empresa. Es necesario analizar las fuentes de emisión que más contribuyen con su huella para establecer actividades que permitan reducir su huella de carbono organizacional. ',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  async showAlertInRange() {
    const alert = await this.alertCtrl.create({
      header: 'Dentro del rango:',
      message: 'Se empresa se encuentra dentro del rango de referencia para huella de carbono por tipo de empresa. Aunque tiene una gran gestión, le recomendamos implementar más actividades para seguir reduciendo su huella de carbono organizacional. ',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  getScopeOneInfo(id: number) {
    try {
      let orgTemp: Carbon = null;
      this.carbonService.getFootIDInfo(id)
      .subscribe(data => {

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.data.length; i++){
          orgTemp = data.data[i];
          this.carbon2.push(orgTemp);
        }
        this.value = Math.round(((-orgTemp.alcance_uno - orgTemp.alcance_dos) * -1) * 100) / 100;
        if(this.value < 100 && orgTemp.tipo === 'Micro empresa' ){
          this.showAlertInRange();
        }else if(this.value > 100 && orgTemp.tipo === 'Micro empresa'){
          this.showAlertOutRange();
        }
        else if(this.value < 300 && orgTemp.tipo === 'Pequeña empresa'){
          this.showAlertInRange();
        }
        else if(this.value > 300 && orgTemp.tipo === 'Pequeña empresa'){
          this.showAlertOutRange();
        }
        else if(this.value < 1000 && orgTemp.tipo === 'Mediana empresa'){
          this.showAlertInRange();
        }
        else if(this.value > 1000 && orgTemp.tipo === 'Mediana empresa'){
          this.showAlertOutRange();
        }
      });
       } catch (error) {
         console.log('Error getOrganization ->', error);
       }
     }

}
