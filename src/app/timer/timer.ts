import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  //All components are implicitly standalone. In order for a component to properly work 
  // with a module, standalone must be set to false
  standalone: false,
  selector: 'app-timer',
  templateUrl: './timer.html',
  styleUrl: './timer.css'
})
export class Timer {
  @ViewChild('cd')
  //Creates a non-null property, countdown, of type CountdownComponent
  public countdown!: CountdownComponent;

  userInput: number | undefined;
  CountdownConfig: CountdownConfig = {
    leftTime: 0,
    demand: true,
    notify: 0,
    format: 'HH:mm:ss'
  };

  //Since ngx-countdown only works in seconds, we need a way to convert numbers into a
  //format more easily understandable by humans.
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
    this.CountdownConfig = {
         leftTime: this.userInput,
         format: 'mm:ss',
       };
    this.countdown.begin();
  }

  stopCountdown(){
    this.countdown.stop();
  }

  pauseCountdown(){
    this.countdown.pause();
  }
  
  //Helper method to better calculate remaining time
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
}
