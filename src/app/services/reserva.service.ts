import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/reserva.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
url:string="https://pistasapi-production-a4c0.up.railway.app/reserva"
  constructor(private http:HttpClient) { }

  hacerReserva(username:string,id_pista:number,id_horario:string,fecha:string):Observable<Reserva>{
    return this.http.post<Reserva>(this.url,{username,id_pista,id_horario,fecha})
  }
}
