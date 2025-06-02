import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
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
    leftTime: 1500,
    demand: true,
    notify: 0
  };

  countdownTimer: {minutes: number, seconds: number} = { 
    minutes: Math.floor((1500 % (60 * 60)) / 60), 
    seconds: Math.floor(1500 % 60), 
  };

  constructor(private cdr: ChangeDetectorRef) { }

  handleCountdownEvent(event: CountdownEvent){
    let leftTime = event.left / 1000;
    this.countdownTimer = {
      minutes: Math.floor((leftTime % (60 * 60)) / 60),
      seconds: Math.floor(leftTime % 60),
    };
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

  private updateCountdownTimerDisplay(leftTimeInSeconds: number){
    this.countdownTimer = {
      minutes: Math.floor((leftTimeInSeconds % (60 * 60)) / 60),
      seconds: Math.floor(leftTimeInSeconds % 60),
    }
  }

  resetCountdown(){
    this.countdown.restart();
    this.updateCountdownTimerDisplay(this.CountdownConfig.leftTime!);
    this.cdr.detectChanges();
  }

  private setTimerMode(leftTime: number){
    this.CountdownConfig = {
      leftTime: leftTime,
      demand: true,
      notify: 0
    };

    this.updateCountdownTimerDisplay(leftTime);
    this.cdr.detectChanges();
    setTimeout(() => {
      this.countdown.restart();
    }, 0);
  }

  pomodoroTimer(){
    this.setTimerMode(1500);
  }

  longRestTimer(){
    this.setTimerMode(600);
  }

  shortRestTimer(){
    this.setTimerMode(300);
  }
}
