import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'ngx-logistics-result',
  templateUrl: './logistics-result.component.html',
  styleUrls: ['./logistics-result.component.scss'],
})
export class LogisticsResultComponent implements OnInit {
  // logisticsrecord:any;
  @Input() logisticsRecords: any;
  constructor() { }

  ngOnInit() {
  }

}
