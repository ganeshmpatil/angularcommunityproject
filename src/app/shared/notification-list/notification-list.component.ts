import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService, Command } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages: Observable<Command[]>;
  constructor(private notificationsService: NotificationService) {
    this.messages = this.notificationsService.messagesOutput;
  }

  ngOnInit(): void {}

  clearMessage(id: number) {
    this.notificationsService.clearMesssage(id);
  }
}
