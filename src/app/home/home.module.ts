import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SearchModule } from '../search/search.module';
import { PistasModule } from '../pistas/pistas.module';
import { CentrosService } from '../services/centros.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SearchModule,
    PistasModule
  ],
  exports: [
    HomeComponent
  ],
  providers:[
    CentrosService
  ]
})
export class HomeModule { }
