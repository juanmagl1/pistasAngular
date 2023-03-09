import { Component, OnInit } from '@angular/core';
import { CentrosService } from 'src/app/services/centros.service';
import { Centro } from '../../interfaces/centro';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
centros!:Centro[];
ngOnInit(): void {
this.service.listadoCentros()
.subscribe({
  next:(resp)=>{
    this.centros=resp
  },
  error:(error)=>{
    console.log(error);
    
  }
})
}

constructor(private service:CentrosService){}
 buscaCentros(query:string){
  if (query===''){
    this.service.listadoCentros()
.subscribe({
  next:(resp)=>{
    this.centros=resp
  },
  error:(error)=>{
    console.log(error);
    
  }
})
  }else {
    this.service.listadoCentrosNombre(query)
    .subscribe({
      next:(resp)=>{
        this.centros=resp
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
 }

}
