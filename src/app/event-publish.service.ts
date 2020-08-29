import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventPublishService {
  private subject = new Subject<any>();

  sendResourceBundleLoadEvent() {
    this.subject.next();
  }

  getResourceBundleLoadEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor() {}
}
