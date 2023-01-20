import { Component } from '@angular/core';
import { DatalocalService } from '../../services/datalocal.service';
import { Registro } from '../../models/registro.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DatalocalService ) {}


  onEnviarCorreo() {
     this.dataLocal.enviarCorreo();
  }

  onAbrirRegistro(registro: Registro){
    console.log("abrir",registro);
    this.dataLocal.abrirRegistro(registro); 
  }
}
