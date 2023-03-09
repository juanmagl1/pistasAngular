import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pista } from '../interfaces/pistas.interface';
import { Observable } from 'rxjs';
import { Reserva } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class PistaService {
url:string="https://pistasapi-production-a4c0.up.railway.app/pista/"

urlPista:string="https://pistasapi-production-a4c0.up.railway.app/getPista/"

urlReserva:string="https://pistasapi-production-a4c0.up.railway.app/reserva/"

  constructor(private http:HttpClient) { }

  obtenerPistas(id:string):Observable<Pista[]>{
    return this.http.get<Pista[]>(`${this.url}${id}`)
  }

  conseguirPista(idPis:string):Observable<Pista>{
    return this.http.get<Pista>(`${this.urlPista}${idPis}`)
  }

  verReservasPorPista(idPist:string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.urlReserva}${idPist}`)
  }

}
