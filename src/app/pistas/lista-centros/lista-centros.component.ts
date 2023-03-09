import { Component, Input } from '@angular/core';
import { Centro } from 'src/app/interfaces/centro';

@Component({
  selector: 'app-lista-centros',
  templateUrl: './lista-centros.component.html',
  styleUrls: ['./lista-centros.component.css']
})
export class ListaCentrosComponent {
  //Creamos este componente con un input para que entre la información desde el componente padre
@Input()centros:Centro[]=[]
}
