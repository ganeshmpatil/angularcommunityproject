import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodRoutingModule } from './blood-routing.module';
import { BloodHomeComponent } from './blood-home/blood-home.component';


@NgModule({
  declarations: [BloodHomeComponent],
  imports: [
    CommonModule,
    BloodRoutingModule
  ]
})
export class BloodModule { }
