import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './stopwatch-service';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css'
})
export class Stopwatch implements OnDestroy {
  //Ensures that stopWatch$ is properly unsubscribed from to prevent memory leaks
  ngOnDestroy(): void {
    this.timerService.stopCount();
    this.subscription.unsubscribe();
  }
  
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

  public startCount(): void {
    this.timerService.startCount()
  }

    public stopCount(): void {
    this.timerService.stopCount()
  }

    public resetCount(): void {
    this.timerService.resetCount()
  }

  formatTime(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }
}
