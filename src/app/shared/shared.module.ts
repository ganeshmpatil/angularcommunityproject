import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalComponent,
    NotificationListComponent,
    PaginationComponent,
    ImageUploadComponent,
    SearchComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [
    InputComponent,
    ModalComponent,
    NotificationListComponent,
    PaginationComponent,
    ImageUploadComponent,
    SearchComponent
  ],
})
export class SharedModule {}
