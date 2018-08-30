import { TestBed, inject } from '@angular/core/testing';

import { LogisticsRecordService } from './logistics-record.service';

describe('LogisticsRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticsRecordService],
    });
  });

  it('should be created', inject([LogisticsRecordService], (service: LogisticsRecordService) => {
    expect(service).toBeTruthy();
  }));
});
