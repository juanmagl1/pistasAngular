import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private cookies:CookieService){}
  //Definimos una variable para el token y otra para devolver un valor boolean
  token:string=this.cookies.get('token')
  flag!:boolean
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Si el token está en las cookies que permita entrar en la pagina, sino lo redirigimos al login
      if (this.token!==''){
          this.flag= true
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tienes que estar registrado!'
        })
        //Si no entra redirige al login
        this.router.navigate(['/'])
        this.flag=false
      }
      console.log(this.token);
      //Devuelve el valor de la bandera
      return this.flag;
  }
  
}
