import { TestBed } from '@angular/core/testing';

import { CitizenregistrationService } from './citizenregistration.service';

describe('CitizenregistrationService', () => {
  let service: CitizenregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
