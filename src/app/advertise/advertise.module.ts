import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvertiseRoutingModule } from './advertise-routing.module';
import { RegisterComponent } from './register/register.component';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [RegisterComponent, BannerComponent, HomeComponent],
  imports: [
    NgbModule,
    CommonModule,
    AdvertiseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdvertiseModule {}
