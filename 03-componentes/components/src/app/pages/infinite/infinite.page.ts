import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
})
export class InfinitePage implements OnInit {
  data: any[] =  Array(20);

  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;
  constructor() { }

  ngOnInit() {
  }

  loadData(){
    setTimeout(()=>{
      if(this.data.length > 50){
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      this.data.push(...Array(20));
      this.infiniteScroll.complete();

    },1500);
    
  }

}
