import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

   peliculas: PeliculaDetalle[] = [];
   private _storage: Storage | null = null;

  constructor(private storage: Storage,
    private toatCtrl: ToastController) { 
     this.init();
  }

  async init(){
        const storage = await this.storage.create();
        this._storage =  storage;
        this.cargarFavoritos();
  }

  public set(key: string, value: any){
         this._storage?.set(key, value);
  }

  async presentToast(message: string){
    const toast =  await this.toatCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    let peliculaExist=  this.peliculas.find(x => x.id === pelicula.id);
    let message = '';
    if(peliculaExist){
        this.peliculas = this.peliculas.filter(x=>x.id != pelicula.id);
        message = 'Removido de favoritos'
    }else{
      this.peliculas.push(pelicula);
      message = 'Se agrego a favoritos';
    }
    this.presentToast(message);
    this.storage.set('peliculas', this.peliculas);
  }


  async cargarFavoritos(){
       const peliculas =  await this.storage.get('peliculas');
       this.peliculas =  peliculas || [];
        return this.peliculas;
  }


  async existePelicula(id: number){
        const existe =  this.peliculas.find(peli=> peli.id === id);
        return (existe) ?  true : false;
  }


}
