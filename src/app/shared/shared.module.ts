import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ErrorMsgComponent,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ]
})
export class SharedModule { }
