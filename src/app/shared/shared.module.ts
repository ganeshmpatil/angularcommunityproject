import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationListComponent } from './notification-list/notification-list.component';

@NgModule({
  declarations: [InputComponent, ModalComponent, NotificationListComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [InputComponent, ModalComponent, NotificationListComponent],
})
export class SharedModule {}
