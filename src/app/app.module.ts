import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PaginaPruebaPage } from '../pages/pagina-prueba/pagina-prueba';
import {MConexionesPage} from '../pages/m-conexiones/m-conexiones';
import {MprincipalPage} from '../pages/mprincipal/mprincipal';
import {IConexionPage} from '../pages/i-conexion/i-conexion';
import {MTablasPage} from '../pages/m-tablas/m-tablas';
import { ApiRisuProvider } from '../providers/api-risu/api-risu';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PaginaPruebaPage,
    MConexionesPage,
    MprincipalPage,
    IConexionPage,
    MTablasPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PaginaPruebaPage,
    MConexionesPage,
    MprincipalPage,
    IConexionPage,
    MTablasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiRisuProvider
  ]
})
export class AppModule {}
