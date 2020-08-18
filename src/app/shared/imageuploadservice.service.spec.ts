import { TestBed } from '@angular/core/testing';

import { ImageuploadserviceService } from './imageuploadservice.service';

describe('ImageuploadserviceService', () => {
  let service: ImageuploadserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageuploadserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
