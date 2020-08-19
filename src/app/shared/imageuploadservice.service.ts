import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageuploadserviceService {
  imageUploadPath: string = 'http://localhost:3000/image/upload';
  private subject: Subject<MessageEvent>;

  /*   public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  } */

  /* private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log('Status is ' + ws.readyState);
          ws.send(JSON.stringify(data));
        }
      },
    };

    return Subject.create(observer, observable);
  } */

  constructor() {}
}
