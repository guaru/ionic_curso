import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements OnInit {
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  fechaNacimiento : Date =  new Date();
  customPickerOptions = {
    buttons: [
      {text:'Hola',
      handler: (event) => {
        console.log(event);
      }
     },
      {text:'Mundo',
       handler: () => {
         console.log("Log!");
       }
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

  cambioFecha($event){
    console.log($event);
    
  }

}
