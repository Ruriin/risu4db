import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRisuProvider } from '../../providers/api-risu/api-risu';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the IConexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-i-conexion',
  templateUrl: 'i-conexion.html',
})
export class IConexionPage {
  datosConexion = {
    nombre: "",
    host: "",
    puerto: "",
    usuario: "",
    contrasena: "",
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public apiRisU: ApiRisuProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IConexionPage');
  }

  showAlert(info) {
    const alert = this.alertCtrl.create({
      title: '¡Info!',
      subTitle: info,
      buttons: ['OK']
    });
    alert.present();
  }

  probarConexion(){
    this.apiRisU.postData(this.datosConexion).then((result) =>{
      this.showAlert(result);
      }, (err) => {
        console.log(err);
      });
  }



}
