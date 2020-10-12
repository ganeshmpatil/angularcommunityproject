import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalComponent,
    NotificationListComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [
    InputComponent,
    ModalComponent,
    NotificationListComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
