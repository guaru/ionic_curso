import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(private barcodeScanner: BarcodeScanner,
    private dataLocal: DatalocalService){

  }
  
  ionViewDidEnter(){
    
  }


  ionViewDidLeave(){
    
  }

  ionViewWillEnter(){
    this.onScan();
  }
  

  onScan(){
    this.barcodeScanner.scan().then(barcodeData => {
        console.log("BARCODE", barcodeData);
        if(!barcodeData.cancelled)
           this.dataLocal.guardarRegistro(barcodeData.format,barcodeData.text);
           
     }).catch(err => {
         console.log('Error', err);
     });
  }
  
}
