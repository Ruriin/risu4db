import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRisuProvider } from "../../providers/api-risu/api-risu";


/**
 * Generated class for the MTablasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-m-tablas',
  templateUrl: 'm-tablas.html',
})
export class MTablasPage {

  items: Array<{nombre: string, host: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiRisU: ApiRisuProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MTablasPage');
  }

  ionViewDidEnter() {
    const datosConexion = JSON.parse(localStorage.getItem("conexionActual"));
    datosConexion != null ? this.infoDB(datosConexion[0]) : this.items = null;
  }

  infoDB(datosConexion) {
    this.apiRisU.obtenerBD(datosConexion).then(
      (result) => {
        this.items = JSON.parse(JSON.stringify(result));
        console.log(this.items);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
