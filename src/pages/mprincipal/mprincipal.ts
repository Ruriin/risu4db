import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiRisuProvider } from "../../providers/api-risu/api-risu";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the MprincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mprincipal",
  templateUrl: "mprincipal.html",
})
export class MprincipalPage {
  pet: string = "puppies";
  iConexion: any;
  mConexiones: any;
  mTablas: any;
  mPrincipal: any;

  public columnas: any = [];
  public columnasInsertar: any = [];

  public tabla: any = [];
  public union: any = [];
  public columna_union: any = [];
  public tabla_union: any = [];

  dataTablas: Array<{ nombre_tabla: string }>;
  dataColumnas: any = [];
  public indiceUnion: number = 0;
  public indiceUnionOn: number = 0;
  dataColumnasUnion: any = [];
  dataColumnasUnionOn: any = [];

  valoresColumnasActualizar: any = [];

  condicionWhere: any = [];

  sintaxis: any = "";

  resultado_consulta: any;
  resultado_consulta_indices: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiRisU: ApiRisuProvider, public alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MprincipalPage");
  }

  mostrarMensaje(info) {
    const alert = this.alertCtrl.create({
      title: "¡Info!",
      subTitle: info,
      buttons: ["OK"],
    });
    alert.present();
  }

  ionViewDidEnter() {
    JSON.parse(localStorage.getItem("conexionActual")) != null || JSON.parse(localStorage.getItem("conexionActual"))[0].db_actual != null ? this.tablasBD(localStorage.getItem("conexionActual")) : this.mostrarMensaje("Debee elegir una base de datos");
  }

  tablasBD(datosConexion) {
    this.apiRisU.obtenerTablas(datosConexion).then(
      (result) => {
        this.dataTablas = JSON.parse(JSON.stringify(result));
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  columnasTabla(tabla: any, idx: any) {
    let listaAnterior = JSON.parse(localStorage.getItem("conexionActual"));
    listaAnterior[0].tabla_actual = tabla;
    let listaNueva = listaAnterior;
    localStorage.setItem("conexionActual", JSON.stringify(listaNueva));

    this.apiRisU.obtenerCoumnas(localStorage.getItem("conexionActual")).then(
      (result) => {
        this.dataColumnas[idx] = JSON.parse(JSON.stringify(result));
        this.columnasInsertar = [];
        this.dataColumnas[idx].forEach((index) => {
          console.log("e" + index);
          this.columnasInsertar.push({ columnas: "" });
        });
        console.log(this.columnasInsertar);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  generarSintaxis(opcion: any) {
    this.sintaxis = opcion;
    this.columnas = [];
    this.tabla = [];
    this.dataColumnas = [];

    this.columnas.push({ columnas: "" });
    this.tabla.push({ tabla: "" });
    this.dataColumnas.push("");

    this.condicionWhere = [];
    this.condicionWhere.push({ columna: "", valor: "" });
  }

  agregarColumna() {
    this.columnas.push({ columnas: "" });
    this.tabla.push({ tabla: "" });
    this.dataColumnas.push("");
  }

  borrarColumna(index) {
    this.columnas.splice(index, 1);
    this.tabla.splice(index, 1);
  }

  generarUnion() {
    this.union = [];
    this.tabla_union = [];
    this.columna_union = [];
    this.union.push({ union: "" });
    this.tabla_union.push({ tabla_union: "", columna_union: "" });
    this.columna_union.push({ on_tabla_union: "", on_columna_union: "" });
    this.dataColumnasUnion.push("");
    this.dataColumnasUnionOn.push("");
  }

  agregarColumnaUnion() {
    this.union.push({ union: "" });
    this.tabla_union.push({ tabla_union: "", columna_union: "" });
    this.columna_union.push({ on_tabla_union: "", on_columna_union: "" });
    this.dataColumnasUnion.push("");
    this.dataColumnasUnionOn.push("");
  }

  borrarColumnaUnion(index) {
    this.union.splice(index, 1);
    this.tabla_union.splice(index, 1);
    this.columna_union.splice(index, 1);
  }

  unionTabla(id: any, index: any) {
    this.dataColumnasUnion[id] = this.columnas[index];
  }

  unionTablaOn(id: any, index: any) {
    this.dataColumnasUnionOn[id] = this.columnas[index];
  }

  generarCondicion() {
    let columnas = JSON.stringify(this.columnas)
      .replace(/[\[\]"{}:]+/g, "")
      .split("columnas")
      .join(" ")
      .trim();
    let tablas = JSON.stringify(this.tabla)
      .replace(/[\[\]"{}:]+/g, "")
      .split("tabla")
      .join(" ")
      .trim();
    console.log(this.sintaxis + " " + columnas + " FROM " + tablas);
    console.log("union");
    let tablaUnion = JSON.stringify(this.tabla_union)
      .replace(/[\[\]"{},:]+/g, "")
      .split("tabla_union")
      .join(" ")
      .trim()
      .split("columna_union")
      .join(".");
    let columnasUnion = JSON.stringify(this.columna_union)
      .replace(/[\[\]"{},:]+/g, "")
      .split("on_tabla_union")
      .join(" ")
      .trim()
      .split("on_columna_union")
      .join(".");
    console.log(tablaUnion);
    console.log(columnasUnion);

    let listaAnterior = JSON.parse(localStorage.getItem("conexionActual"));
    listaAnterior[0].consulta =
      this.sintaxis + " " + columnas + " FROM " + tablas;
    let listaNueva = listaAnterior;
    localStorage.setItem("conexionActual", JSON.stringify(listaNueva));

    this.apiRisU.ejecutarSelect(localStorage.getItem("conexionActual")).then(
      (result) => {
        this.pet = "kittens";
        !Array.isArray(result)
          ? this.mostrarMensaje(result)
          : (this.resultado_consulta = result);
        this.resultado_consulta_indices = Object.keys(result);
      },
      (err) => {
        console.log("eror" + err);
      }
    );
  }

  public getKeys(data) {
    this.resultado_consulta_indices = Object.keys(data);
    return true;
  }

  insertarRegistro() {
    let consulta_registro =
      this.sintaxis +
      " " +
      JSON.stringify(this.tabla[0].tabla).replace(/"+/g, "") +
      " (" +
      JSON.stringify(this.dataColumnas)
        .replace(/[\[\]"{}:]+/g, "")
        .split("columnas")
        .join(" ")
        .trim() +
      ") " +
      "VALUES (" +
      JSON.stringify(this.columnasInsertar)
        .replace(/[\[\]{}:]+/g, "")
        .split('"columnas"')
        .join(" ")
        .trim() +
      ")";

    let listaAnterior = JSON.parse(localStorage.getItem("conexionActual"));
    listaAnterior[0].consulta = consulta_registro;
    let listaNueva = listaAnterior;
    localStorage.setItem("conexionActual", JSON.stringify(listaNueva));
    this.apiRisU
      .ejecutarInsertInto(localStorage.getItem("conexionActual"))
      .then(
        (result) => {
          this.pet = "kittens";
          this.mostrarMensaje(result);
        },
        (err) => {
          console.log("eror" + err);
        }
      );
  }

  actualizarRegistro() {
    const combined = this.columnas[0].columnas.map(
      (char, i) =>
        char + "=" + '"' + this.valoresColumnasActualizar[i].valor + '"'
    );
    let consultaActualizar =
      this.sintaxis +
      " " +
      JSON.stringify(this.tabla[0].tabla).replace(/"+/g, "") +
      " SET " +
      combined +
      " WHERE " +
      this.condicionWhere[0].columna +
      "=" +
      '"' +
      this.condicionWhere[0].valor +
      '"';
    let listaAnterior = JSON.parse(localStorage.getItem("conexionActual"));
    listaAnterior[0].consulta = consultaActualizar;
    let listaNueva = listaAnterior;
    localStorage.setItem("conexionActual", JSON.stringify(listaNueva));
    this.apiRisU
      .ejecutarInsertInto(localStorage.getItem("conexionActual"))
      .then(
        (result) => {
          this.pet = "kittens";
          this.mostrarMensaje(result);
        },
        (err) => {
          console.log("eror" + err);
        }
      );
  }

  borrarRegistro() {
    let consulta_borrar =
      this.sintaxis +
      " " +
      JSON.stringify(this.tabla[0].tabla).replace(/"+/g, "") +
      " WHERE " +
      this.condicionWhere[0].columna +
      "=" +
      '"' +
      this.condicionWhere[0].valor +
      '"';
    let listaAnterior = JSON.parse(localStorage.getItem("conexionActual"));
    listaAnterior[0].consulta = consulta_borrar;
    let listaNueva = listaAnterior;
    localStorage.setItem("conexionActual", JSON.stringify(listaNueva));
    this.apiRisU
      .ejecutarInsertInto(localStorage.getItem("conexionActual"))
      .then(
        (result) => {
          this.pet = "kittens";
          this.mostrarMensaje(result);
        },
        (err) => {
          console.log("eror" + err);
        }
      );
  }

  columnasActualizar() {
    this.valoresColumnasActualizar = [];
    this.columnas[0].columnas.forEach((index) => {
      this.valoresColumnasActualizar.push({ valor: "" });
    });
  }
}
