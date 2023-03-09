import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/login.interface';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  user!:Usuario
  
  constructor(private usu:UsuarioService,private cookies:CookieService,private fb:FormBuilder){}
  usernameId:string=this.cookies.get('user');
  myForm:FormGroup=this.fb.group({
    telefono:['',[Validators.required]],
    username:['',[Validators.required]],
    pass:['',[Validators.required]],
    nombre:['',[Validators.required]],
    email:['',[Validators.required]],
    role:['',[Validators.required]]
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
