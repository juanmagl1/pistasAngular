import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { TokenResponse } from '../interfaces/token.interfaces';
import { Login, User, UsuarioRegisrado } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Esta es la url de la petición de login
url:string="https://pistasapi-production-a4c0.up.railway.app/signin";
//La url de la peticion de registro
urlRegister:string="https://pistasapi-production-a4c0.up.railway.app/usuario"
//La variable que cambia el navbar cuando se inicia sesión
private loggedIn = new BehaviorSubject<boolean> (false);
//Devuelve loggedin como observable boolean
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(private cookies:CookieService,private http:HttpClient) { }
//Nos hemos creado una interfaz para que nos de el usuario le pasamos el usuario completo
login(user:Login):Observable<Boolean>{
  //Realizamos la peticion post al servicio con la url 
  //Tiene como parametros el usuario username y password
  //SE TIENE QUE LLAMAR IGUAL QUE EN LA API
  console.log(user);
  //Le pasamos la url, sin la cabecera y con el objeto que le hemos pasado por parametro
  return this.http.post<TokenResponse>(this.url,user)
  .pipe(switchMap(token=>{
    //GUardamos el token y el usuario en las cookies para cogerlo en futuros metodos
    this.cookies.set('token',token.token)
    this.cookies.set('user',user.username)
    //Cuando iniciamos sesión le cambiamos el valor a loggedin a true
    this.loggedIn.next(true);
    return of(true);
  }),catchError(_error=>{
    console.log(_error);
    //Si nos da error, borramos el token de las cookies
    this.cookies.delete('token')
    this.cookies.delete('user')
    return of(false);
  })
  
  )
}
//Metodo para cerrar sesión y cuando lo haga que borre el token y el usuario de las cookies
logout():void{
  this.cookies.delete('token');
  this.cookies.delete('user');  
  this.loggedIn.next(false);
}
//Metodo para registrar a un usuario nuevo
register(user:User):Observable<boolean>{
  return this.http.post<UsuarioRegisrado>(this.urlRegister,user)
  .pipe(switchMap(resp=>{
    return of(true);
    
  }),catchError(_error=>{
    return of(false)
  })
  
  )
}



}
