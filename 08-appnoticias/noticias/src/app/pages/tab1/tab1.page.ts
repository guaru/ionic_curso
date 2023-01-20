import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infinitScroll : IonInfiniteScroll;
  
  public articles: Article[]  = [];

  constructor(private newsService: NewsService) {}


  ngOnInit(): void {
     this.newsService.getTopHeadLines()
     .subscribe(articles => this.articles.push(...articles));
  }

  
  loadData(){
    this.newsService.getTopHeadLinesByCategory('business', true).
    subscribe(articles => { 
       if(articles.length === this.articles.length){
          this.infinitScroll.disabled = true;
           return;
       }
           
       this.articles =  articles;
       this.infinitScroll.complete();
     });
 }


}
