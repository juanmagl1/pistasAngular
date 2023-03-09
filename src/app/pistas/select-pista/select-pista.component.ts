import { Component, OnInit } from '@angular/core';
import { CalendarOption } from '@fullcalendar/angular/private-types';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { style } from '@angular/animations';
import { PistaService } from '../../services/pista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pista } from '../../interfaces/pistas.interface';
import { Reserva } from '../../interfaces/reserva.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ReservaService } from 'src/app/services/reserva.service';
import Swal from 'sweetalert2';
const moment=require('moment')
@Component({
  selector: 'app-select-pista',
  templateUrl: './select-pista.component.html',
  styleUrls:['select-pista.css']
})
export class SelectPistaComponent implements OnInit {
  
  constructor(private pist:PistaService,private router:ActivatedRoute,private fb:FormBuilder,
  private cookies:CookieService,private res:ReservaService){}
  //El id de la pista
  id:string=this.router.snapshot.params['idPista']
  //Las reservas que hay en cada pista
  reserva!:Reserva[]
  ngOnInit() {
    console.log(this.id);
    this.pintar()
    
  }

myForm:FormGroup=this.fb.group({
  username:[''],
  pista:[this.id],
  horario:[''],
  fecha:['']
})

calendarOptions:CalendarOptions={
  initialView:'timeGridFourDay',
  plugins:[timeGridPlugin,interactionPlugin],
  selectable:true,
  defaultTimedEventDuration:"01:00",
  dateClick: this.seleccionarFecha.bind(this),
  views: {
    timeGridFourDay: {
      type: 'timeGrid',
      duration: { days: 4 },
      slotLabelFormat:{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        meridiem: 'short',
  },
  allDayContent:false,
      slotMinTime:'12:00',
      slotMaxTime:'20:00'
    }
},
events:[
  {
    title:"Evento potente",
    start:"2023-03-09 12:00"
  }
],

eventColor:'red'
}



pintar(){
  this.pist.verReservasPorPista(this.id)
  .subscribe({
    next:(respuesta)=>{
      this.reserva=respuesta
      this.calendarOptions.events=this.cargarEventos()         
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  
}

cargarEventos(){
  let ocupado=[]
  for(let i=0;i<this.reserva.length;i++){
     let hora=this.reserva[i].id_horario.split('-')
     let evento={
      title:this.reserva[i].username,
      start:`${this.reserva[i].fecha} ${hora[0]}:00`
     }
     ocupado.push(evento);
    
    console.log(ocupado);
    
  }
return ocupado
}

seleccionarFecha(selectInfo:any){
  const dat=moment().format('YYYYY-MM-DD')
  const formato=selectInfo.dateStr
  //El split coge el caracter que le pasamos lo quita y mete una separación donde esté ese caracter
  const fecha=formato.split('T')
  this.myForm.controls['fecha'].setValue(fecha[0])
  const hor=fecha[1].split(':')
  this.myForm.controls['horario'].setValue(hor[0])
  const name:string=this.cookies.get('user')
  this.myForm.controls['username'].setValue(name)
  
}

addReserva(){
  let username=this.myForm.controls['username'].value
  let id_pista:number=parseInt(this.id)
  let id_horario=this.myForm.controls['horario'].value
  let fecha=  this.myForm.controls['fecha'].value

  this.res.hacerReserva(username,id_pista,id_horario,fecha)
.subscribe({
  next:(val)=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  },
  error:(err)=>{
    console.log(err);
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
})
    
  }
})
}
}
