import { Component, Input, OnInit } from '@angular/core';
import { Platform, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Organization } from '../../../interfaces/organization';
import { OrganizationService } from '../../../services/organization.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.page.html',
  styleUrls: ['./update-organization.page.scss'],
})
export class UpdateOrganizationPage implements OnInit {
  // tslint:disable-next-line: ban-types
  selectedValType: Number = 3;
  public employee: string = '(-)';
  // tslint:disable-next-line: ban-types
  selectedValSector: Number = 1;
  dataType: any[] = [];
  dataSector: any[] = [];
  isUpdate = false;
  select: Date = new Date(Date.now());
  @Input() organizations: Organization;
  uid: string = '';
  // tslint:disable-next-line: variable-name
  value = '';
  // tslint:disable-next-line: variable-name
  id_usuario: string;
  nombre: string;
  superficie: number;
  empleados: number;
  fecha: Date;
  data = {
    id_usuario: '',
    nombre: '',
    tipo: '',
    sector: '',
    fecha: new Date(),
    superficie: 0,
    direccion: '',
    empleados:  0
  };
  constructor(private platform: Platform, private modalController: ModalController,
              private organizationService: OrganizationService,
              public authservice: AuthService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController ) {
    this.platform.ready().then(() => {
      this.dataType = [
      {id: 1, name: 'Mediana empresa'},
      {id: 2, name: 'Micro empresa'},
      {id: 3, name: 'Pequeña empresa'},
      {id: 4, name: 'Otras'}];
      this.dataSector = [
        {id: 1, name: 'Empresa comercial'},
        {id: 2, name: 'Empresa financieras'},
        {id: 3, name: 'Empresa inmobiliaria'},
        {id: 4, name: 'Empresa textil'},
        {id: 5, name: 'Otras'}];
    });
  }
  ngOnInit() {
    if (this.organizations) {
      this.isUpdate = true;
      this.data = this.organizations;
    }
    this.UidUser();
  }
  UidUser(){
    this.authservice.getUserAuth().subscribe(user => {
      this.id_usuario = user.uid;
    });
  }
  async dismissOrganization() {
    await this.modalController.dismiss();
  }
  OnSubmit(form: NgForm){
    const organization = form.value;
    if (this.isUpdate === true) {
      //this.updateOrganization(organization);
      this.OnSubmitUpdate(organization);
    }else{
      this.OnSubmitAdd(organization);
    }
  }
  async OnSubmitAdd(organization: Organization){
    if (this.nombre === '' ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el nombre de la organización',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.tipo === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el tipo de organización',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.sector === '' ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el sector de la organización',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.fecha === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la fecha',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.superficie === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la superficie',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.direccion === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la dirección',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.empleados === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la cantidad de empleados',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
      this.addOrganization(organization);
    }
  }
  async OnSubmitUpdate(organization: Organization){
    if (this.data.nombre === '' ){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el nombre de la organización',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.tipo === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el tipo de organización',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.sector === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar el sector de la organización',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.fecha === undefined){
      console.log(this.fecha);
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la fecha',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if ( this.data.superficie === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la superficie',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.direccion === ''){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la dirección',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else if (this.data.empleados === undefined){
      const toast = this.toastCtrl.create({
        message: 'Por favor ingresar la cantidad de empleados',
        duration: 2000,
        position: 'bottom'
      });
      (await toast).present();
    }else{
     this.confirmationUpdate(organization);
    }
  }
  addOrganization(organization: Organization){
    this.organizationService.storeOrganization(organization).subscribe(response => {
      this.modalController.dismiss(response, 'OrganizacionCreada');
    });
  }
  updateOrganization(organization: Organization) {
    this.organizationService.updateOrg(organization, this.organizations.id).subscribe(() => {
    organization.id = this.organizations.id;
    this.modalController.dismiss(organization, 'OrganizacionModificada');
    });
  }

  async confirmationUpdate(organization: Organization) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      subHeader: '¿Esta seguro que desea modificar la organización?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.updateOrganization(organization);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.dismissOrganization();
          }
        },
      ]
    });
    await alert.present();
  }
  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'Se debe ingresar el "Nombre", ' +
      // tslint:disable-next-line: max-line-length
      '"Tipo" '+', "Sector"' + ', "Fecha" en la que se realizara el cálculo de la huella de carbono, "Superficie" en metros cuadrados,'+
      ' "Dirección" y la cantidad de "Empleados" de la organización"' ,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  OnChange(event){
    if (event.target.value === 'Mediana empresa'){
      this.employee = '(50-199)';
    }else if (event.target.value === 'Micro empresa'){
      this.employee = '(1-9)';
    }else if (event.target.value === 'Pequeña empresa'){
      this.employee = '(10-49)';
    }
    else if (event.target.value === 'Otras'){
      this.employee = '(-)';
    }
  }
}
