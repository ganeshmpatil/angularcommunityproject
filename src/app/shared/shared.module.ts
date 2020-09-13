import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [InputComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [InputComponent, ModalComponent],
})
export class SharedModule {}
