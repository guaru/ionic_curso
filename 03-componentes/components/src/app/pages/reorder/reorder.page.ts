import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.page.html',
  styleUrls: ['./reorder.page.scss'],
})
export class ReorderPage implements OnInit {

  personajes: string[] = ['Demo1','Demo2','Demo3','Demo4','Demo5','Demo6'];
  disabled: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  doReorder(event:any){
   const itemMov = this.personajes.splice(event.detail.from,1)[0];
   this.personajes.splice(event.detail.to,0,itemMov);
   event.detail.complete();
   console.log(this.personajes);
  }

  onClick(){
    this.disabled =  !this.disabled;
  }

}
