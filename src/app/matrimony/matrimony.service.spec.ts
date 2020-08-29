import { TestBed } from '@angular/core/testing';

import { MatrimonyService } from './matrimony.service';

describe('MatrimonyService', () => {
  let service: MatrimonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrimonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
