import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Timer } from './timer';
import { CountdownModule } from 'ngx-countdown';




@NgModule({
  imports: [BrowserModule, CountdownModule],
  declarations: [ Timer ],
  bootstrap: [ Timer ]
})
export class PomodoroModule { }
