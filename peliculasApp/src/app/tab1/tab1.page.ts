import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

     peliculasRecientes:BehaviorSubject<Pelicula[]>  =  new  BehaviorSubject<Pelicula[]>([] as Pelicula[]);

     populares:BehaviorSubject<Pelicula[]>  =  new  BehaviorSubject<Pelicula[]>([] as Pelicula[]);
  
  
    constructor( private moviService: MoviesService) {}


    ngOnInit(): void {
      this.moviService.getFeature().subscribe(resp => {
            this.peliculasRecientes.next(resp.results);
      });  
      
      this.getPopulares();
    }



    getPopulares(){  
      this.moviService.getPopulares().subscribe(resp => {
        this.populares.next([...this.populares.getValue(),...resp.results]);
      });
    }


    cargarMas(){
          this.getPopulares();
    }

  
}
