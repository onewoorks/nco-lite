import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';



@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule {

  getUser(){
    return 'user'
  }
 }
