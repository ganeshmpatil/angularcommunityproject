import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeHomeComponent } from './trade-home/trade-home.component';

const routes: Routes = [{ path: 'home', component: TradeHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeRoutingModule {}
