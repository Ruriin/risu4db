import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiRisuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRisuProvider {

  urlApi:string="http://localhost/apiRisu/app_web.php";

  constructor(public http: HttpClient) {
    console.log('Hello ApiRisuProvider Provider');
  }

  postData(datosConexion) {
    return new Promise((resolve, reject) => {


     this.http.post(this.urlApi+'/prueba_conexion', datosConexion)
     .subscribe(res => {
      resolve(res);
     }, (err) => {
      resolve(err);
     });
 });

}

}
