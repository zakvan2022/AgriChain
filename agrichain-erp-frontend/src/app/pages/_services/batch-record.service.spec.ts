import { TestBed, inject } from '@angular/core/testing';

import { BatchRecordService } from './batch-record.service';

describe('BatchRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchRecordService],
    });
  });

  it('should be created', inject([BatchRecordService], (service: BatchRecordService) => {
    expect(service).toBeTruthy();
  }));
});
