import { TestBed } from '@angular/core/testing';

import { ApplicationServicesService } from './application-services.service';

describe('ApplicationServicesService', () => {
  let service: ApplicationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
