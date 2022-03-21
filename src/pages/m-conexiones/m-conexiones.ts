import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MConexionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-m-conexiones',
  templateUrl: 'm-conexiones.html',
})
export class MConexionesPage {
  items: Array<{nombre: string, host: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

// Carga la pagina
  ionViewDidLoad() {
    console.log('ionViewDidLoad MConexionesPage');
  }

// Al cargarse la pagina se obtiene la lista de conexiones del almacenamiento local
  ionViewDidEnter() {
    this.items = JSON.parse(localStorage.getItem("listaConexiones"));
  }
// Metodo borrarConexion: El metodo hace una copia de la lista anterior, despues quita la conexion seleccionada de la lista y rellena la lista con los nuevos valores
  borrarConexion(item){
    const listaAnterior = JSON.parse(localStorage.getItem('listaConexiones'));
    const nuevaLista = listaAnterior.filter(({ nombre: x }) => x != item.nombre);
    localStorage.setItem('listaConexiones', JSON.stringify(nuevaLista));
    JSON.parse(localStorage.getItem('listaConexiones')).length < 1 ? localStorage.removeItem('conexionActual') : console.log("hay datos");
    this.ionViewDidEnter();
  }
// Metodo conexionHost: El metodo obtiene el elemento seleccionado y lo guarda en una variable para su uso posterior
  conexionHost(item){
    const itemLista = JSON.parse(localStorage.getItem('listaConexiones')).filter(({ nombre: x }) => x === item.nombre);
    localStorage.setItem('conexionActual', JSON.stringify(itemLista));
    console.log(JSON.parse(localStorage.getItem("conexionActual")));
  }

}
