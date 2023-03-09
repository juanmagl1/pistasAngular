import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Centro } from '../interfaces/centro';
@Injectable({
  providedIn: 'root'
})
export class CentrosService {
url:string='https://pistasapi-production-a4c0.up.railway.app/centro'
  constructor(private http:HttpClient) { }

  listadoCentros():Observable<Centro[]>{
    return this.http.get<Centro[]>(this.url);
  }

  listadoCentrosNombre(nombre:string){
    return this.http.get<Centro[]>(`${this.url}/${nombre}`)
  }
}
