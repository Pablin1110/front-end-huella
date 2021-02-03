import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateOrganizationPage } from 'src/app/pages/organization/update-organization/update-organization.page';
import {Organization} from 'src/app/interfaces/organization';
import { OrganizationService } from '../../services/organization.service';
import { DataOrganization } from '../../interfaces/data-organization';
import { Router } from '@angular/router';
import { ScopeonePage } from '../scopeone/scopeone.page';
import { ScopetwoPage } from '../scopetwo/scopetwo.page';
import { CarbonService } from '../../services/carbon.service';
import { ScopetwoService } from '../../services/scopetwo.service';
import { ScopeoneService } from '../../services/scopeone.service';
import { Carbon } from '../../interfaces/carbon';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {
  @Input() organizations: Organization[] = [];
  public carbon: any = [];
  select: Date = new Date(Date.now());
  public org: any = [];
  isUpdate = false;
  value = '';
  data = {
    id_usuario: '',
    nombre: '',
    tipo: '',
    sector: '',
    fecha: this.select,
    superficie: 0,
    direccion: '',
    empleados:  0
  };
  constructor(public authservice: AuthService, public actionSheetController: ActionSheetController,
              private modalController: ModalController,
              private organizationService: OrganizationService,
              private alertCtrl: AlertController,
              public router: Router,
              public navCtrl: NavController,
              private carbonService: CarbonService,
              private scopetwoService: ScopetwoService,
              private scopeoneService: ScopeoneService, ) { }

  ngOnInit() {
    // this.getAllOrganization();
    this.getOrganization();
  }
  doSomething(event){
    this.getOrganization();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  getAllOrganization() {
    try {
      let orgTemp: Organization = null;
      this.organizationService.getAllOrganization()
    .subscribe(data => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.data.length; i++){
        orgTemp = data.data[i];
        this.org.push(orgTemp);
      }
    });
    } catch (error) {
      console.log('Error getOrganization ->', error);
    }

  }
  getOrganization() {
    this.org = [];
    try {
      let orgTemp: Organization = null;
      this.authservice.getUserAuth().subscribe((user) => {
        if (user){
          this.organizationService.getOrganization(user.uid)
          .subscribe(data => {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < data.data.length; i++){
              orgTemp = data.data[i];
              this.org.push(orgTemp);
            }
          });
        }
      });
    } catch (error) {
      console.log('Error getOrganization ->', error);
    }
  }
  addOrganization(){
    this.modalController.create({
      component: UpdateOrganizationPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'OrganizacionCreada'){
        this.organizations.push(data);
        this.getOrganization();
      }
    });
  }
  updateOrganization(organizations: Organization){
    this.modalController.create({
      component: UpdateOrganizationPage,
      componentProps: {organizations}
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'OrganizacionModificada'){
        this.organizations = this.organizations.filter(std => {
          if (data.id === std.id){
            return data;
          }
          return std;
        });
      }
    });
  }
  deleteOrganization(organizations: Organization) {
    this.organizationService.deleteOrganization(organizations.id)
    .subscribe((data) => {
      this.getOrganization();
      this.getFoot();

    });
    this.scopeoneService.deleteAllScopeOne(organizations.id).subscribe((data)=>{
    });
    this.carbonService.deleteFoot(organizations.id).subscribe((data)=>{
    });
    this.scopetwoService.deleteAllScopeTwo(organizations.id).subscribe((data)=>{
    });
  }
  async confirmationDelete(organization: Organization) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      subHeader: '¿Esta seguro que desea eliminar la organización?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.deleteOrganization(organization);
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
  async getOrg(id: number) {
    const servModal = await this.modalController.create({
      component: ScopeonePage,
      backdropDismiss: false,
      componentProps: {
        scopeone: id,
     }
    });
    return await servModal.present();
  }
  async getOrgScopetwo(id: number) {
    const servModal = await this.modalController.create({
      component: ScopetwoPage,
      backdropDismiss: false,
      componentProps: {
        scopetwo: id,
     }
    });
    return await servModal.present();
  }

  async presentActionSheet(id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Alcance uno',
        icon: 'earth',
        handler: () => {
         this.getOrg(id);
        }
      },
      {
        text: 'Alcance dos',
        icon: 'flash',
        handler: () => {
          this.getOrgScopetwo(id);
        }
      },{
        text: 'Ayuda',
        icon: 'information-circle-outline',
        handler: () => {
          this.showAlert();
        }
      }],
    });
    await actionSheet.present();
  }
  getFoot(){
    this.carbon = [];
    try {
    
     let orgTemp: Carbon = null;
 
     this.authservice.getUserAuth().subscribe((user)=>{
       this.carbonService.getFootID(user.uid)
       .subscribe(data => {
         // tslint:disable-next-line: prefer-for-of
         for (let i = 0; i < data.data.length; i++){
           orgTemp = data.data[i];
           this.carbon.push(orgTemp);
         }
       });
     });
     } catch (error) {
       console.log('Error getOrganization ->', error);
     }
   }
   async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'En la pantalla "Organización" podemos observar todas las organizaciones ingresadas. </br>Para "Modificar" o "Eliminar un organización"'+
      'se debe deslizar hacia la izquierda, y se mostraran los botones respectivamente.<br>Al presionar sobre la organización se mostrara un menú, '+
      'para ingresar los alcances 1 y 2 de la organización.' ,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}

