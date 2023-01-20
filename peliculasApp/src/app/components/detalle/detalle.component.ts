import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
 
  @Input() id:number;

  pelicula: PeliculaDetalle = {};
  actores: Cast [] = [];
  oculto: number = 150;
  existe: string = 'star';
  
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };
  constructor(private movieService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService) { }

  ngOnInit() {
     this.loadExist();
     this.movieService.getPeliculaDetalle(this.id).subscribe(resp => {
         this.pelicula = resp;
     });

     this.movieService.getActoresPelicula(this.id).subscribe(resp => {
        this.actores =  resp.cast;
     });
  }

  regresar(){
      this.modalCtrl.dismiss();
  }

  loadExist(){
    this.dataLocalService.existePelicula(this.id)
    .then(exist => this.existe = exist ? 'star' :  'star-outline');
  }
  
  favorito(){
    this.dataLocalService.guardarPelicula(this.pelicula);
    this.loadExist();
  }



}
