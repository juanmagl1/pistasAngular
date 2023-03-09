import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Centro } from '../interfaces/centro';
@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  //La url para que nos devuelva todos los centros
url:string='https://pistasapi-production-a4c0.up.railway.app/centro'
  constructor(private http:HttpClient) { }
//Metodo para que nos de todos los centros
  listadoCentros():Observable<Centro[]>{
    return this.http.get<Centro[]>(this.url);
  }
//Metodo para que nos busque todos los centros por nombre
  listadoCentrosNombre(nombre:string){
    return this.http.get<Centro[]>(`${this.url}/${nombre}`)
  }
}
