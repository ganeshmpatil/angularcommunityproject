import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdvertiseRoutingModule } from './advertise-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    AdvertiseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdvertiseModule {}
