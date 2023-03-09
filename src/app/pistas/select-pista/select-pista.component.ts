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
//Creamos el formulario  reactivo con los valores
myForm:FormGroup=this.fb.group({
  username:[''],
  pista:[this.id],
  horario:[''],
  fecha:['']
})
//Creamos el calendario con las opciones definidas
calendarOptions:CalendarOptions={
  initialView:'timeGridFourDay',
  validRange:function(nowDate){
    return{
      start:nowDate
    }
  },
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


//Evento para pintar el calendario
pintar(){
  this.pist.verReservasPorPista(this.id)
  .subscribe({
    next:(respuesta)=>{
      this.reserva=respuesta
      //Se mete una promesa dentro de otra porque son asincronas y sino no espera a que acabe una para que empiece otra
      this.calendarOptions.events=this.cargarEventos()         
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  
}
//Evento que carga los eventos en el calendario
cargarEventos(){
  let ocupado=[]
  for(let i=0;i<this.reserva.length;i++){
    //En el id horario, cuando llega al guion separa y lo convierte a array
     let hora=this.reserva[i].id_horario.split('-')
     //Creamos el evento
     let evento={
      title:this.reserva[i].username,
      start:`${this.reserva[i].fecha} ${hora[0]}:00`
     }
     ocupado.push(evento);
    
    
  }
return ocupado
}
//Metodo para seleccionar la fecha
seleccionarFecha(selectInfo:any){
  //Nos hemos instalado la libreria format para que nos de la fecha del dia de hoy con el formato ese 
  const dat=moment().format('YYYYY-MM-DD')
  const formato=selectInfo.dateStr
  //El split coge el caracter que le pasamos lo quita y mete una separación donde esté ese caracter
  const fecha=formato.split('T')
  //Le cambiamos los valores al formulario
  this.myForm.controls['fecha'].setValue(fecha[0])
  const hor=fecha[1].split(':')
  this.myForm.controls['horario'].setValue(hor[0])
  const name:string=this.cookies.get('user')
  this.myForm.controls['username'].setValue(name)
  
}
//Metodo para añadir la reserva
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
