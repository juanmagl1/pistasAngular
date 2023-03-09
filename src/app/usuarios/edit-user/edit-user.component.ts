import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/login.interface';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  user!:Usuario
  
  constructor(private usu:UsuarioService,private cookies:CookieService,private fb:FormBuilder){}
  usernameId:string=this.cookies.get('user');
  myForm:FormGroup=this.fb.group({
    telefono:[''],
    username:[''],
    pass:[''],
    nombre:[''],
    email:[''],
    role:['']
  })
  ngOnInit(): void {
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
            pass:'',
            nombre:resp.nombre
          })
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }

  }

}
