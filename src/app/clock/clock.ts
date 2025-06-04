import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-clock',
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class Clock implements OnDestroy {
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  ampm: string = '';

  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {
    this.getTime();
    this.intervalId = setInterval(() => {
      this.getTime();
      this.cdr.detectChanges();
    }, 100);
  }
  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }

  getTime(): void {
    const time = new Date();

    let currentHour = time.getHours();
    this.minute = time.getMinutes();
    this.second = time.getSeconds();

    this.ampm = currentHour >= 12 ? 'PM' : 'AM';
    this.hour = currentHour % 12;
    this.hour = this.hour ? this.hour : 12
  }

  formatTime(time: number) : string {
    return time < 10 ? '0' + time : '' + time;
  }
}
