import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CitizenRegistryRoutingModule } from './citizen-registry-routing.module';
import { CitizenregistryhomeComponent } from './citizenregistryhome/citizenregistryhome.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CitizencardComponent } from './citizencard/citizencard.component';

@NgModule({
  declarations: [CitizenregistryhomeComponent, RegisterformComponent, CitizencardComponent],
  imports: [
    CommonModule,
    CitizenRegistryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [CitizenregistryhomeComponent],
})
export class CitizenRegistryModule {}
