import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the ApiRisuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRisuProvider {
  urlApi: string = "http://localhost/apiRisu/app_web.php";
// Se crea la conexion con la API y se manda un mensaje al conectarse
  constructor(public http: HttpClient) {
    console.log("Hello ApiRisuProvider Provider");
  }
// Metodo pruebaConexion: Llamada a la API donde envian los datos del formulario para ingresar la base de datos y se comprueba que haya una conexion
  pruebaConexion(datosConexion) {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlApi + "/prueba_conexion", datosConexion).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }
// Metodo obtenerBD: Se obtienen las bases de datos con un llamado a la API para hacer la consulta en la base de datos
  obtenerBD(datosConexion) {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlApi + "/obtener_bd", datosConexion).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }
}
