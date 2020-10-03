import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { BloodRoutingModule } from './blood-routing.module';
import { BloodHomeComponent } from './blood-home/blood-home.component';
import { BloodRegisterComponent } from './blood-register/blood-register.component';

@NgModule({
  declarations: [BloodHomeComponent, BloodRegisterComponent],
  imports: [
    CommonModule,
    BloodRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class BloodModule {}
