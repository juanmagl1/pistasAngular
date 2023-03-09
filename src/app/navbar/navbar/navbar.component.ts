import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/login.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['style.component.css']
})
export class NavbarComponent implements OnInit{
  //Creamos una variable tipo observable boolean para que pueda recibir el valor de la del servicio
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService:AuthService,private cookies:CookieService,private us:UsuarioService){ }
  ngOnInit() {
    //Al iniciarse el componente  llamamos al isLoggedin del servicio y lo igualamos al que hemos creado
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }


//Llamamos al metodo logout
logout(){
  this.authService.logout()
}
}
