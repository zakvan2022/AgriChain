import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';

@Component({
  selector: 'ngx-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  minutes: number = 20;
  seconds: number = 20;
  total_seconds: number;

  constructor(private st: SimpleTimer) { }

  ngOnInit() {}

  start() {
    this.total_seconds = (this.minutes * 60) + this.seconds;
    this.st.delTimer('1sec');
    this.st.newTimer('1sec', 1);
    this.st.subscribe('1sec', () => {
      if (this.total_seconds > 0) {
        this.total_seconds--;
        this.minutes = (this.total_seconds > 60 ? Math.trunc(this.total_seconds / 60) : 0);
        this.seconds = (this.total_seconds > 60 ? this.total_seconds % 60 : this.total_seconds);
      } else {
        this.st.delTimer('1sec');
      }
    });
  }
}
