import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas:BehaviorSubject<Pelicula[]|PeliculaDetalle[]>  =  new  BehaviorSubject<Pelicula[]|PeliculaDetalle[]>([] as Pelicula[]);
  
  slideOpts = {
    slidesPerView:3.3,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
