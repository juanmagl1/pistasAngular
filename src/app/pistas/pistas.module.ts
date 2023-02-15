import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCentrosComponent } from './lista-centros/lista-centros.component';
import { SelectPistaComponent } from './select-pista/select-pista.component';
import { RouterModule } from '@angular/router';
import { ListaPistasComponent } from './lista-pistas/lista-pistas.component';



@NgModule({
  declarations: [
    ListaPistasComponent,
    ListaCentrosComponent,
    SelectPistaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ListaPistasComponent,
    ListaCentrosComponent,
    SelectPistaComponent
  ]
})
export class PistasModule { }