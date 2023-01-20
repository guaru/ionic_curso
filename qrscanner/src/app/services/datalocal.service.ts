import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  private _storage: Storage | null = null;
  historial : Registro[ ] =  [];

  constructor(private storage:  Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser) {
    this.init();
   }

  async init(){
     const storage =  await this.storage.create();
     this._storage =  storage;
     this.loadHistorial();
  }

  guardarRegistro(format: string, texto: string){
      const newRegistro = new Registro(format,texto);
      this.historial.unshift(newRegistro);
      this.set('historial',this.historial);
      this.abrirRegistro(newRegistro);
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

 private async loadHistorial(){
     const historial =  await this._storage?.get('historial');
     this.historial =  historial || [];
  }

  public abrirRegistro(registro: Registro){
    this.navCtrl.navigateForward('/tabs/tab2');
     switch (registro.type) {
      case "http":
            this.iab.create(registro.text,'_system');
        break;
      case "geo":
            this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;
      default:
        break;
     }
  }

  enviarCorreo(){
    const TITULOS = 'Tipo, Formato, Creado en, Texto';
  }

}
