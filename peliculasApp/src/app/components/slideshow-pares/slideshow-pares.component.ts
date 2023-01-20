import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas:BehaviorSubject<Pelicula[]>  =  new  BehaviorSubject<Pelicula[]>([] as Pelicula[]);
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView:3.3,
    freeMode: true,
    spaceBetween: -10
  };
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  
  onClick(event)
  {
    this.cargarMas.emit(event);
  }


  async verDetalle(id: number){
    const modal =  await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps : {
         id
      }
    });

    modal.present();
  }
}
