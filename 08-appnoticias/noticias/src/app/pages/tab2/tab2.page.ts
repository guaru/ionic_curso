import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {

   @ViewChild(IonInfiniteScroll) infinitScroll : IonInfiniteScroll;

   
   

  public categories: string [] = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
  ];

  public  selectedCategory: string = this.categories[0];
  public articles: Article[]  = [];
  
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadArticles();
  }


  segmentChanged(event: any){
    this.selectedCategory =  event.detail.value; 
    this.loadArticles();
  }   

  loadArticles(){
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(
      articles => this.articles = [...articles]);
  }

  loadData(){
     this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true).
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
