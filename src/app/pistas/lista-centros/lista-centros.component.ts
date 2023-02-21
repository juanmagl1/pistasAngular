import { Component, Input } from '@angular/core';
import { Centro } from 'src/app/interfaces/centro';

@Component({
  selector: 'app-lista-centros',
  templateUrl: './lista-centros.component.html',
  styleUrls: ['./lista-centros.component.css']
})
export class ListaCentrosComponent {
@Input()centros:Centro[]=[]
}
