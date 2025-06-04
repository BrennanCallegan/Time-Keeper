import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './stopwatch-service';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css'
})
export class Stopwatch implements OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
  counter: number = 0;

  //Manages observable stream from TimerService
  private subscription: Subscription = new Subscription();

  //Injects TimerService. Dependency injection makes the service available in the component
  constructor(private timerService : TimerService) {
    this.subscription.add(
      this.timerService.stopWatch$.subscribe(
        //Emited values are assigned to counter making the time visible on the page
        (val: number) => this.counter = val
      )
    )
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
}
