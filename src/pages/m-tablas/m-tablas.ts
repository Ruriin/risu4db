import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRisuProvider } from "../../providers/api-risu/api-risu";
import { AlertController } from "ionic-angular";


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
  datosConexion;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiRisU: ApiRisuProvider, public alertCtrl: AlertController) {
  }
// Metodo para cargar la pagina
  ionViewDidLoad() {
    console.log('ionViewDidLoad MTablasPage');
  }

  mostrarMensaje(info) {
    const alert = this.alertCtrl.create({
      title: "¡Info!",
      subTitle: info,
      buttons: ["OK"],
    });
    alert.present();
  }

// Cuando se crea la pagina se comprueba la conexion actual y que los datos de la conexion no esten vacios
  ionViewDidEnter() {
    this.datosConexion = JSON.parse(localStorage.getItem("conexionActual"));
    this.datosConexion != null ? this.infoDB(this.datosConexion[0]) : this.items = null;
  }
// Con los datos de la conexion se obtienen las tablas de la respectiva base de datos
  infoDB(datosConexion) {
    this.apiRisU.obtenerBD(datosConexion).then(
      (result) => {
        !Array.isArray(result) ? this.mostrarMensaje(result) : this.items = JSON.parse(JSON.stringify(result));
      },
      (err) => {
        this.items = null;
        console.log(err);
      }
    );
  }

  dbActual(item){
    this.datosConexion[0].db_actual = item;
    let listaNueva = this.datosConexion;
    localStorage.setItem('conexionActual', JSON.stringify(listaNueva));
  }

}
