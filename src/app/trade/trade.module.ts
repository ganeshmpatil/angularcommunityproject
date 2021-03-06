import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TradeRoutingModule } from './trade-routing.module';
import { TradeHomeComponent } from './trade-home/trade-home.component';
import { RegisterComponent } from './register/register.component';
import { TradecardComponent } from './tradecard/tradecard.component';
import { SharedModule } from '../shared/shared.module';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [TradeHomeComponent, RegisterComponent, TradecardComponent, ImageListComponent],
  imports: [
    CommonModule,
    TradeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TradeModule {}
