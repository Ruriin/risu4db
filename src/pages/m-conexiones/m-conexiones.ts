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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MConexionesPage');
    this.items = JSON.parse(localStorage.getItem("listaConexiones"));
  }

  borrarConexion(item){
  const listaAnterior = JSON.parse(localStorage.getItem('listaConexiones'));
  const nuevaLista = listaAnterior.filter(({ nombre: x }) => x != item.nombre);
  localStorage.setItem('listaConexiones', JSON.stringify(nuevaLista));
  }

  conexionHost(item){
    const itemLista = JSON.parse(localStorage.getItem('listaConexiones')).filter(({ nombre: x }) => x === item.nombre);
    localStorage.setItem('conexionActual', JSON.stringify(itemLista));
    console.log(JSON.parse(localStorage.getItem("conexionActual")));
  }

}
