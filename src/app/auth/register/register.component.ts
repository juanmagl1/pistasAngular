import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
@ViewChild('myForm') myForm!:NgForm;

initForm = {
  nombre: '',
  email:'',
  pass:'',
  repeat:''
}

notValid(campo:string):boolean{
  return this.myForm?.controls[campo].invalid &&
  this.myForm?.controls[campo]?.touched
}

}
