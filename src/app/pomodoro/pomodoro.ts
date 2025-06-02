import { Component, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  standalone: false,
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.html',
  styleUrl: './pomodoro.css'
})
export class Pomodoro {
  @ViewChild('cd')
  public countdown!: CountdownComponent;
  CountdownConfig: CountdownConfig = {
    leftTime: 1500000,
    demand: true,
    notify: 0
  };
  minutes: number = 0;
  seconds: number = 0;

  countdownTimer: any = { minutes: 0, seconds: 0 };

  handleCountdownEvent(event: CountdownEvent){
    setTimeout(() => {
      let leftTime = event.left / 1000;
      this.countdownTimer = {
        days: Math.floor(leftTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((leftTime % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((leftTime % (60 * 60)) / 60),
        seconds: Math.floor(leftTime % 60),
      };
    });
  }

  startCountdown(){
    this.countdown.begin();
  }

  stopCountdown(){
    this.countdown.stop();
  }

  pauseCountdown(){
    this.countdown.pause();
  }

  resetCountdown(){
    this.countdown.restart();
  }
}
