import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  superHeroes :  Observable<any[]>;
  filter: string = '';
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.superHeroes =  this.dataService.getHeroes();
  }


  segmentChanged(evt){
    this.filter = evt.detail.value;
    this.filter = this.filter == 'todos' ? '' : this.filter;
  }

}
