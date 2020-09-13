import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatrimonyRoutingModule } from './matrimony-routing.module';
import { MatrimonyHomeComponent } from './matrimony-home/matrimony-home.component';
import { RegisterComponent } from './register/register.component';
import { MatrimonycardComponent } from './matrimonycard/matrimonycard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MatrimonyHomeComponent,
    RegisterComponent,
    MatrimonycardComponent,
  ],
  imports: [
    CommonModule,
    MatrimonyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MatrimonyModule {}
