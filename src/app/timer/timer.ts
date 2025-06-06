import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimerService } from './timer-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [FormsModule, CommonModule],
  templateUrl: './timer.html',
  styleUrls: ['./timer.css'],
})
export class Timer implements OnDestroy{
  //Ensures that stopWatch$ is properly unsubscribed from to prevent memory leaks
  ngOnDestroy(): void {
    this.timerService.stopCount();
    this.subscription.unsubscribe();
  }
  
  userInput: number | undefined;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  //Manages observable stream from TimerService
  private subscription: Subscription = new Subscription();

  //Injects TimerService. Dependency injection makes the service available in the component
  constructor(private timerService : TimerService, private cdr: ChangeDetectorRef) {
    this.subscription.add(
      this.timerService.stopWatch$.subscribe(
        //Emited values are assigned to counter making the time visible on the page
        (totalSeconds: number) => {
          this.hours = this.timerService.getHours(totalSeconds);
          this.minutes = this.timerService.getMinutes(totalSeconds);
          this.seconds = this.timerService.getSeconds(totalSeconds);
          this.cdr.detectChanges();
        }
      )
    );
  }

  public setCountdown(): void {
    if (this.userInput !== undefined && this.userInput >= 0){
      this.timerService.setCountdown(this.userInput);
    }
  }

  public startTimer(): void {
    this.timerService.startCount();
    this.cdr.detectChanges();
  }

    public stopTimer(): void {
    this.timerService.stopCount();
    this.cdr.detectChanges();
  }

    public resetTimer(): void {
    this.timerService.resetCount();
    this.cdr.detectChanges();
  }

  formatTime(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }
}
