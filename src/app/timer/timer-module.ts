import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Timer } from './timer';
import { CountdownModule } from 'ngx-countdown';




@NgModule({
  imports: [BrowserModule, CountdownModule, FormsModule],
  declarations: [ Timer ],
  bootstrap: [ Timer ]
})
export class PomodoroModule { }
