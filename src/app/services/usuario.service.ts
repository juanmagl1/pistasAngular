import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Usuario } from '../interfaces/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
url:string="https://pistasapi-production-a4c0.up.railway.app/usuario";  

obtenerUsuario(username:string):Observable<Usuario>{
  console.log(`${this.url}/${username}`);
  return this.http.get<Usuario>(`${this.url}/${username}`)
}
}
