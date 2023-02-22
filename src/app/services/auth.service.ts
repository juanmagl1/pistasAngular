import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { TokenResponse } from '../interfaces/token.interfaces';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Esta es la url de la petición
url:string="http://localhost:9094/signin";
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
    console.log(token.token);
    
    this.cookies.set('token',token.token)
    return of(true);
  }),catchError(_error=>{
    console.log(_error);
    
    this.cookies.delete('token')
    return of(false);
  })
  
  )
}

logout():void{
  this.cookies.delete('token');  
}

}
