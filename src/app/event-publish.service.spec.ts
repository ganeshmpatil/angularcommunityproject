import { TestBed } from '@angular/core/testing';

import { EventPublishService } from './event-publish.service';

describe('EventPublishService', () => {
  let service: EventPublishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPublishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
