import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(values:any[], texto : string = '',columna: string = 'title'): any {
    if(texto !=null  && texto != '')
        return values.filter(item => item[columna].toLowerCase().includes(texto.toLowerCase()));
    else 
        return values;
  }

}
