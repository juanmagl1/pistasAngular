import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pista } from 'src/app/interfaces/pistas.interface';
import { PistaService } from '../../services/pista.service';

@Component({
  selector: 'app-lista-pistas',
  templateUrl: './lista-pistas.component.html',
  styleUrls:['./lista-pistas.component.css']
})
export class ListaPistasComponent implements OnInit {
  
  constructor(private pista:PistaService,private route:ActivatedRoute){}
  //El parametro del id del centro
  id:string=this.route.snapshot.params['id']
  pistas!:Pista[]
  ngOnInit() {
    //Peticion para que nos devuelva las pistas
    this.pista.obtenerPistas(this.id)
    .subscribe({
      next:(val)=>{
        this.pistas=val
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
