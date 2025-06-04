import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class Clock {
  date: string | Date | undefined
  dateTime: string | undefined;

  constructor() {
    setInterval(() => {
      this.getTime()
    }, 100);
  }

  getTime() {
    this.date = new Date();
    const time = new Date();

    this.dateTime = 
      time.getHours() +
      ":"
      time.getMinutes() +
      ":"
      time.getSeconds();

      this.date = formatDate(time, 'hh:mm:ss a', 'en-US');

  }
}
