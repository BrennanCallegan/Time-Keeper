import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Clock } from './clock';



@NgModule({
  declarations: [Clock],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ]
})
export class ClockModule { }
