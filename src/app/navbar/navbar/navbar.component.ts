import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/login.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['style.component.css']
})
export class NavbarComponent implements OnInit{
  username:string=this.cookies.get('user');
  user!:Usuario
  constructor(private authService:AuthService,private cookies:CookieService,private us:UsuarioService){ }
  ngOnInit() {
    if (this.username!==null){
      this.modificar=false
    }
  }
modificar:boolean=true;


logout(){
  this.authService.logout()
  this.modificar=true
}
}
