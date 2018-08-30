import { TestBed, inject } from '@angular/core/testing';

import { WeatherReportService } from './weather-report.service';

describe('WeatherReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherReportService],
    });
  });

  it('should be created', inject([WeatherReportService], (service: WeatherReportService) => {
    expect(service).toBeTruthy();
  }));
});
