import { Component, Input, OnInit } from '@angular/core';

import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() index: number;

  constructor(private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private sicalSharing: SocialSharing,
    private storageService: StorageService) { }

  ngOnInit() { }

  public openArticle() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    }
    window.open(this.article.url, '_black');
  }

  public async onOpenMenu() {

    const articleInFavorite:boolean = this.storageService.articleInFavorite(this.article);

    let buttons: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Remover de favoritos' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const share = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onSharedArticle()
    };

   // if (this.platform.is('cordova')) {
      buttons.unshift(share);
    //}
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons
    });


    await actionSheet.present();
  }

  private onSharedArticle() {

    if(this.platform.is('cordova')){
      this.sicalSharing.share(
        this.article.title,
        this.article.source.name,
        null,
        this.article.url
      );
    }else{
      if (navigator.share) {
        navigator.share({
          title: this.article.title,
          text: this.article.source.name,
          url: this.article.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log('NO SE PUDO COMPARTIR');
      }
    }
   
  }

  private onToggleFavorite() {
     this.storageService.saveRemoveArticle(this.article);
  }

}
