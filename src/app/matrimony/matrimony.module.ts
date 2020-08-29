import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatrimonyRoutingModule } from './matrimony-routing.module';
import { MatrimonyHomeComponent } from './matrimony-home/matrimony-home.component';


@NgModule({
  declarations: [MatrimonyHomeComponent],
  imports: [
    CommonModule,
    MatrimonyRoutingModule
  ]
})
export class MatrimonyModule { }
