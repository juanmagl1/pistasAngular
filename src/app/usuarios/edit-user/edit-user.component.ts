import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, UsuarioPass } from '../../interfaces/login.interface';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  //Creamos un tipo usuario para que nos devuelva los datos del usuario que ha iniciado sesión
  user!:Usuario
  //Creamos una variable de tipo any para asignarle los valores del formulario
  us:any={
    telefono:'',
    pass:'',
    username:'',
    email:'',
    role:'',
    nombre:''
  }
  
  constructor(private usu:UsuarioService,private cookies:CookieService,private fb:FormBuilder,private router:Router){}
  usernameId:string=this.cookies.get('user');
  //Creamos el formulario reactivo con las restricciones
  myForm:FormGroup=this.fb.group({
    telefono:['',[Validators.required]],
    username:['',[Validators.required]],
    pass:[''],
    nombre:['',[Validators.required]],
    email:['',[Validators.required]],
    role:['',[Validators.required]],
    fotoPerfil:['',[Validators.required]],
    fileSource:['']
  })
  ngOnInit() {
    //Cargamos los datos del usuario que esta registrado en los valores del formulario
    if (this.usernameId!==null){
      this.usu.obtenerUsuario(this.usernameId)
      .subscribe({
        next:(resp)=>{
          this.user=resp
          this.myForm.setValue({
            telefono: resp.telefono,
            email:resp.email,
            username:resp.username,
            role:resp.role,
            nombre:resp.nombre,
            pass:'',
            fotoPerfil:'',
            fileSource:''
          })
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }

  }
//Metodo para que nos informe de los errores que hay en el formulario
  isValidField(campo:string){
    return this.myForm.controls[campo].errors&&
    this.myForm.controls[campo].touched
  }
  //Metodo para updatear el usuario, asignandole los valores del formulario al valor any que hemos creado antes
  save(){
    this.us.email=this.myForm.value.email
    this.us.telefono=this.myForm.value.telefono
    this.us.pass=this.myForm.value.pass
    this.us.username=this.myForm.value.username
    this.us.role=this.myForm.value.role
    this.us.nombre=this.myForm.value.nombre
    console.log(this.us.email);
    
  
    
    this.usu.editarUsuario(this.us.username,this.us,this.myForm.get('fileSource')?.value)
    .subscribe({
      next:(val)=>{
        this.router.navigate(['/'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  onFileSelected(event:any){
    if(event.target.files.length>0){
      const file:File = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
    }
    );
  }
}

}