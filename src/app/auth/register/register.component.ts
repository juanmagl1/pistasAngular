import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //Creamos un formulario template con el decorador viewchild(), para que pille los cambios en el formulario
@ViewChild('myForm') myForm!:NgForm;

constructor(private auth:AuthService,private router:Router){ }

//Metodo para que nos muestre los errores del formulario
notValid(campo:string):boolean{
  return this.myForm?.controls[campo].invalid &&
  this.myForm?.controls[campo]?.touched
}
//Metodo que nos registra al nuevo usuario si está todo correcto
add(){
this.auth.register(this.myForm.value)
.subscribe(resp=>{
  if (resp){
    this.router.navigate(['/login'])
  }else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
    })
  }
})
}
}
