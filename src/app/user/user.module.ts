import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';



@NgModule({
  declarations: [
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UpdateUserComponent,
    DeleteUserComponent
  ]
})
export class UserModule { }
