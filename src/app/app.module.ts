import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectPistaComponent } from './pistas/select-pista/select-pista.component';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    NavbarModule,
    AuthModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    AuthService
     
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
