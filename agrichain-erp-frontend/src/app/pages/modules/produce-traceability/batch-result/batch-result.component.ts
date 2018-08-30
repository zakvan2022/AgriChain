import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-batch-result',
  templateUrl: './batch-result.component.html',
  styleUrls: ['./batch-result.component.scss'],
})
export class BatchResultComponent implements OnInit {
  @Input() batchRecords: any;

  constructor() {

  }

  ngOnInit() {
  }
}
