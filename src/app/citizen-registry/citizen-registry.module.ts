import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CitizenRegistryRoutingModule } from './citizen-registry-routing.module';
import { CitizenregistryhomeComponent } from './citizenregistryhome/citizenregistryhome.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CitizenregistryhomeComponent, RegisterformComponent],
  imports: [
    CommonModule,
    CitizenRegistryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [CitizenregistryhomeComponent],
})
export class CitizenRegistryModule {}
