import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Usuario, UsuarioPass } from '../interfaces/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
url:string="https://pistasapi-production-a4c0.up.railway.app/usuario";  
//Metodo para obtener un usuario
obtenerUsuario(username:string):Observable<Usuario>{
  console.log(`${this.url}/${username}`);
  return this.http.get<Usuario>(`${this.url}/${username}`)
}
//Metodo para editar el usuario, lo que hace es pasarle la imagen fuera del formulario porque en la api 
//está configurado asi 
editarUsuario(username:string,us:UsuarioPass,img:File):Observable<any>{
  const datos: FormData = new FormData();
  datos.append('file', img,img.name);
  datos.append('user', new Blob([JSON.stringify(us)], {type: 'application/json'}))
  
  return this.http.put<any>(`${this.url}/${username}`,datos)
}
}
