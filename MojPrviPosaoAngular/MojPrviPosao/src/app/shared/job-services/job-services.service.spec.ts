import { TestBed } from '@angular/core/testing';

import { JobServicesService } from './job-services.service';

describe('JobServicesService', () => {
  let service: JobServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
