import { style } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls:['./search.component.css']
})
export class SearchComponent {
@Output()centroEvento:EventEmitter<string>=new EventEmitter();
centro!:string;

buscarCentro(){
  this.centroEvento.emit(this.centro);
  this.centro=""
}

}
