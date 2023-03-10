import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/interfaces/login.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
constructor(private authService:AuthService,private fb:FormBuilder,private router:Router){ }
  ngOnInit(): void {
  }
//Creamos el formulario reactivo con las restricciones
myForm:FormGroup=this.fb.group({
  username:['',Validators.required],
  password:['',[Validators.required]]
})
//Llamamos al metodo login
login(){
// usuario:Login=this.myForm.value
this.authService.login(this.myForm.value)
.subscribe(resp=>{
  if (resp){
    //Para instalar SweetAlert2 el comando es 
    //npm install sweetalert2
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
    this.ngOnInit()
    this.router.navigate(['/'])
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    this.router.navigate(['/login'])
  }
})
}
//Metodo para que nos muestre los errores del formulario
isValidField(campo:string){
  return this.myForm.controls[campo].errors&&
  this.myForm.controls[campo].touched
}

}
