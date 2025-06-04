import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  //Starting point of timer and reset value
  private readonly initialTime = 0;

  //timer$ is a BehaviorSubject that holds and maintains current time
  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  private lastStoppedTime: number = this.initialTime;
  private timerSubscription: Subscription = new Subscription();
  private isRunning: boolean = false;

  constructor() {}

  //Returns the current time as an observable, allowing components to subscribe to it
  public get stopWatch$(): Observable<number> {
    return this.timer$.pipe(
      map((val: number) => val)
    )
  }

  startCount(): void {
    if (this.isRunning) {
      return;
    }

    //Uses timer observable to emit value every 1000ms (1 sec)
    this.timerSubscription = timer(0, 1000)
      //Emitted value is updated by lastStopedTime and subscribes value to timer, updating it every second
      .pipe(map((value: number): number => value + this.lastStoppedTime))
      .subscribe(this.timer$)

    this.isRunning = true;
  }

  stopCount(): void {
    //Calling unsubscribe on the timerSubscription stops it from emiting new values
    this.lastStoppedTime = this.timer$.value;
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetCount(): void {
    this.timerSubscription.unsubscribe();
    this.lastStoppedTime = this.initialTime;
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }
}