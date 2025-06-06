import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  //Starting point of timer and reset value
  private readonly initialTime = 0;

  //timer$ is a BehaviorSubject that holds and maintains current time
  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  private lastStoppedTime: number = this.initialTime;
  private stopwatchSubscription: Subscription = new Subscription();
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
    this.stopwatchSubscription = timer(0, 1000)
      //Emitted value is updated by lastStopedTime and subscribes value to timer, updating it every second
      .pipe(map((value: number): number => value + this.lastStoppedTime))
      .subscribe(this.timer$)

    this.isRunning = true;
  }

  stopCount(): void {
    //Calling unsubscribe on the stopwatchSubscription stops it from emiting new values
    this.lastStoppedTime = this.timer$.value;
    this.stopwatchSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetCount(): void {
    this.stopwatchSubscription.unsubscribe();
    this.lastStoppedTime = this.initialTime;
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }

  public getHours(totalSeconds: number) : number {
    return Math.floor(totalSeconds / 3600);
  }

    public getMinutes(totalSeconds: number) : number {
    return Math.floor((totalSeconds % 3600) / 60);
  }

    public getSeconds(totalSeconds: number) : number {
    return Math.floor(totalSeconds % 60);
  }
}