import { Injectable, input } from "@angular/core";
import { BehaviorSubject, map, Observable, Subscription, takeWhile, timer, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  userInput: number | undefined;
  private readonly initialTime = 0;

  private timer$: BehaviorSubject<number> = new BehaviorSubject(this.initialTime);
  private countdownValue: number = this.initialTime;
  private timerSubscription: Subscription = new Subscription();
  private isRunning: boolean = false;

  constructor() {}

  //Returns the current time as an observable, allowing components to subscribe to it
  public get stopWatch$(): Observable<number> {
    return this.timer$.asObservable();
  }

  public setCountdown(value: number): void {
    this.countdownValue = value;
    this.timer$.next(this.countdownValue);
  }

  startCount(): void {
    if (this.isRunning || this.countdownValue <= 0) {
      return;
    }

    let currentRemainingTime = this.timer$.value;

    if (currentRemainingTime <= 0 && this.countdownValue <= 0) {
      // Prevent starting if no duration is set and current time is 0
      console.warn('No countdown duration set. Please use setCountdown() first.');
      this.isRunning = false;
      return;
    }

    if (currentRemainingTime <= 0 && this.countdownValue > 0) {
        // If currentRemainingTime is 0 but an initial duration was set (e.g., after a previous countdown finished)
        // Reset to the initial duration to allow starting again.
        currentRemainingTime = this.countdownValue;
        this.timer$.next(currentRemainingTime); // Update the display to the initial duration
    }


    this.isRunning = true;

    // Unsubscribe from any previous active subscription before starting a new one
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    //Uses timer observable to emit value every 1000ms (1 sec)
    this.timerSubscription = timer(0, 1000)
      //Emitted value is updated by lastStopedTime and subscribes value to timer, updating it every second
      .pipe(
        map((elapsed: number) => currentRemainingTime - elapsed),
        takeWhile(val => val >= 0),
        tap(val => {
          this.timer$.next(val);
        }),
      )
      .subscribe({
        next: (val: number) => {
          this.timer$.next(val);
          if (val <= 0){
            this.stopCount();
          }
        },
        complete: () => {
          this.timer$.next(0); // Ensure the displayed time is exactly 0
          this.stopCount();    // Stop the timer (sets isRunning to false)
        }
      });

    this.isRunning = true;
  }

  stopCount(): void {
    //Calling unsubscribe on the timerSubscription stops it from emiting new values
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetCount(): void {
    this.timerSubscription.unsubscribe();
    this.countdownValue = this.initialTime;
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