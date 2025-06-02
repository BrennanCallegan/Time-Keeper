import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Pomodoro } from './pomodoro';
import { CountdownModule } from 'ngx-countdown';




@NgModule({
  imports: [BrowserModule, CountdownModule],
  declarations: [ Pomodoro ],
  bootstrap: [ Pomodoro ]
})
export class PomodoroModule { }
