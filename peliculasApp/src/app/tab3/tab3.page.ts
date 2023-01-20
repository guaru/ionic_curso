import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas:BehaviorSubject<Pelicula[]|PeliculaDetalle[]>  =  new  BehaviorSubject<Pelicula[]|PeliculaDetalle[]>([] as Pelicula[]);
  generos: any[] = [];
  constructor(private dataLocalService: DataLocalService,
    private movieService:MoviesService) {}

 async  ngOnInit() {
     this.generos = await this.movieService.cargarGeneros();
     this.dataLocalService.cargarFavoritos().then(data=>{
        this.peliculas.next(data);
     });
  }

}
