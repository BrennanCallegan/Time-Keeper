import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { StopwatchService } from './stopwatch-service';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css'
})
export class Stopwatch implements OnDestroy {
  //Ensures that stopWatch$ is properly unsubscribed from to prevent memory leaks
  ngOnDestroy(): void {
    this.StopwatchService.stopCount();
    this.subscription.unsubscribe();
  }
  
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  //Manages observable stream from StopwatchService
  private subscription: Subscription = new Subscription();

  //Injects StopwatchService. Dependency injection makes the service available in the component
  constructor(private StopwatchService : StopwatchService, private cdr: ChangeDetectorRef) {
    this.subscription.add(
      this.StopwatchService.stopWatch$.subscribe(
        //Emited values are assigned to counter making the time visible on the page
        (totalSeconds: number) => {
          this.hours = this.StopwatchService.getHours(totalSeconds);
          this.minutes = this.StopwatchService.getMinutes(totalSeconds);
          this.seconds = this.StopwatchService.getSeconds(totalSeconds);
          this.cdr.detectChanges();
        }
      )
    );
  }

  public startCount(): void {
    this.StopwatchService.startCount()
  }

    public stopCount(): void {
    this.StopwatchService.stopCount()
  }

    public resetCount(): void {
    this.StopwatchService.resetCount()
  }

  formatTime(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }
}
