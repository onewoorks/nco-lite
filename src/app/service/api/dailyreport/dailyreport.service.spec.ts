import { TestBed } from '@angular/core/testing';

import { DailyreportService } from './dailyreport.service';

describe('DailyreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyreportService = TestBed.get(DailyreportService);
    expect(service).toBeTruthy();
  });
});
