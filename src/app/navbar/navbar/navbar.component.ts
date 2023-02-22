import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['style.component.css']
})
export class NavbarComponent {
  constructor(private authService:AuthService){ }
modificar:boolean=true;


logout(){
  this.authService.logout()
}
}
