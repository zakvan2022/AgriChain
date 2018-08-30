import { Component, OnInit } from '@angular/core';
import { LogisticsRecordService } from '../../_services/logistics-record.service';
import { BatchRecordService } from '../../_services/batch-record.service';
import Helper from '../../_helper';

@Component({
  selector: 'ngx-produce-traceability',
  templateUrl: './produce-traceability.component.html',
  styleUrls: ['./produce-traceability.component.scss'],
  providers: [BatchRecordService, LogisticsRecordService],
})
export class ProduceTraceabilityComponent implements OnInit {

  values: any;
  logisticsRecords: any;
  batchRecords: any;
  filtered_batchRecords: any;
  filtered_logisticsRecords: any;

  isMapTrace: boolean;
  isLogistic: boolean;
  isBatch: boolean;
  noResultFound: boolean;

  constructor(
    private _bService: BatchRecordService,
    private _lService: LogisticsRecordService,
    private helper: Helper,
  ) {
    this.isLogistic = false;
    this.isBatch = false;
    this.noResultFound = false;
    this.isMapTrace = false;
  }
  getLogisticsRecords() {
    this._lService.getLogisticsRecords().subscribe(res => {
      this.logisticsRecords = res;
    });
  }
  getBatchRecords() {
    this._bService.getBatchRecords().subscribe(res => {
      this.batchRecords = res;
    });
  }
  trace(value) {

    this.isBatch = false;
    this.noResultFound = false;
    this.isLogistic = false;

    this.values = value;
    const _batchExists = this.helper.filterObject(
      this.batchRecords, ['batchId', 'barcode'], this.values,
    );
    const _logisticsIdExists = this.helper.filterObject(
      this.logisticsRecords, ['logisticsId', 'barcode'], this.values,
    );

    if (_batchExists.length > 0) {
      this.isBatch = true;
      this.isLogistic = false;
      this.filtered_batchRecords = _batchExists;
    }

    if (_logisticsIdExists.length > 0) {
      this.isLogistic = true;
      this.isBatch = false;
      this.filtered_logisticsRecords = _logisticsIdExists;
    }

    if (_batchExists.length === 0 && _logisticsIdExists.length === 0) {
      this.noResultFound = true;
    }
  }

  ngOnInit() {
    this.getLogisticsRecords();
    this.getBatchRecords();
  }

}
