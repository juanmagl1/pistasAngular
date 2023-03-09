import { style } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls:['./search.component.css']
})
export class SearchComponent {
  //Este componente lo creamos con un output, que lo que hace es mandar informacion a otro componente
@Output()centroEvento:EventEmitter<string>=new EventEmitter();
centro!:string;
//Metodo para buscar el centro que tiene como parametro un string con el la cadena en el html del componente padre
//con ese parametro
buscarCentro(){
  this.centroEvento.emit(this.centro);
  this.centro=""
}

}
