import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiRisuProvider } from "../../providers/api-risu/api-risu";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the IConexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-i-conexion",
  templateUrl: "i-conexion.html",
})
export class IConexionPage {
  // Definicion de variables para obtener informacion
  datosConexion = {
    nombre: "",
    host: "",
    puerto: "",
    usuario: "",
    contrasena: "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiRisU: ApiRisuProvider, public alertCtrl: AlertController) {
    
  }
// Metodo para cargar la pagina
  ionViewDidLoad() {
    console.log("ionViewDidLoad IConexionPage");
  }
// Metodo de mostrar alerta
  mostrarMensaje(info) {
    const alert = this.alertCtrl.create({
      title: "¡Info!",
      subTitle: info,
      buttons: ["OK"],
    });
    alert.present();
  }
// Metodo probarConexion: Envia un conjunto de datos a la API para comprobar si la conexion es posible o las credenciales estan mal
  probarConexion() {
    this.apiRisU.pruebaConexion(this.datosConexion).then(
      (result) => {
        this.mostrarMensaje(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
// Metodo guardarConexion: Guarda la conexion en el almacenamiento local de la maquina y crea una lista con las conexiones ingresadas
  guardarConexion() {
    var listaConexiones = JSON.parse(
      localStorage.getItem("listaConexiones") || "[]"
    );
    listaConexiones.push(this.datosConexion);
    localStorage.setItem("listaConexiones", JSON.stringify(listaConexiones));
    console.log(localStorage.getItem("listaConexiones"));
  }
}
