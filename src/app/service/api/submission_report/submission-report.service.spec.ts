import { TestBed } from '@angular/core/testing';

import { SubmissionReportService } from './submission-report.service';

describe('SubmissionReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissionReportService = TestBed.get(SubmissionReportService);
    expect(service).toBeTruthy();
  });
});
