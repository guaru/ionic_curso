import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaMDB, PeliculaDetalle, Cast, RespuestaCredits } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  constructor(private http:HttpClient) { }


  private exec<T>(query: string){
    query = environment.API + query;
     query += `&api_key=${environment.API_KEY}&language=es&include_image_language=es`;
     return this.http.get<T>(query);
  }

  getFeature(): Observable<RespuestaMDB>{
    const hoy =  new Date();
    const ultimoDia =  new Date(hoy.getFullYear(),hoy.getMonth() + 1, 0).getDate();
    const mes =  hoy.getMonth() + 1;
    let mesString = mes.toString().padStart(2,"0");
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin  =  `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    return this.exec<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() :  Observable<RespuestaMDB>
  {
    this.popularesPage++;
    console.log("PAGINA:",this.popularesPage);
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.exec<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: number) : Observable<PeliculaDetalle>{
     return this.exec<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: number): Observable<RespuestaCredits>{
    return this.exec<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  search(search: string){
    return this.exec(`/search/movie?query=${search}`);
  }

  cargarGeneros(): Promise<any[]>{
    return new Promise<any[]>(resolve =>{
      this.exec(`/genre/movie/list?a=!`).subscribe(resp => {
        resolve(resp['genres']);
      });
    });
  }



}
