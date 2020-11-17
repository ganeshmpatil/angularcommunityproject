import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  FeedbackPath = 'http://localhost:3000/feedback';

  constructor(private http: HttpClient) { }

  createFeedback(feedback) {
    return this.http.post(this.FeedbackPath, feedback);
  }
}
