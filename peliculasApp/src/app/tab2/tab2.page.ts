import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar: string = "";

  ideas: string[] = ["Spiderman", "Avangers", "El señor de los anillos"];
  peliculas:BehaviorSubject<Pelicula[]>  =  new  BehaviorSubject<Pelicula[]>([] as Pelicula[]);
  totalPeliculas: number = 0;
  load: boolean =  false;
  constructor(private movieService: MoviesService,
    private modalCtrl: ModalController) {}


  buscar(event){
    this.search(event.detail.value);
  }

  setIdea(idea: string){
    this.textoBuscar =  idea;
  }

  search(search: string){
    this.load =  true;
    if(search==null || search.trim() === ''){
       this.totalPeliculas = 0;
       this.peliculas.next([]);
       this.load =  false;
      return;
    }
      
    this.movieService.search(search).subscribe(resp => {
      this.peliculas.next(resp['results']);
      this.totalPeliculas =  this.peliculas.getValue().length;
      this.load =  false;
    });
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
