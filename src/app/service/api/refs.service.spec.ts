import { TestBed } from '@angular/core/testing';

import { RefsService } from './refs.service';

describe('RefsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefsService = TestBed.get(RefsService);
    expect(service).toBeTruthy();
  });
});
