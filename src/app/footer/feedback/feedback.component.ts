import { FeedbackService } from './../feedback.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Resources } from '../../resources';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  resources = Resources;
  feedbackForm = new FormGroup({
    comments: new FormControl('', [Validators.required]),
    name: new FormControl(''),
  });

  feedBackFormVisible = true;
  constructor(
    private feedBackService: FeedbackService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}


  createFeedback() {
    this.feedBackService.createFeedback(this.feedbackForm.value).subscribe(
      (value) => {
        this.notificationService.addSuccess(this.resources.FeedBackPostSuccess);
        this.feedBackFormVisible = false;
      },
      (error) => {
        this.notificationService.addError(this.resources.FeedBackPostFail);
      }
    );
  }

  onCancelClick(){
    this.feedBackFormVisible = false;
  }

}
