import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeHomeComponent } from './trade-home/trade-home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: TradeHomeComponent },
  { path: 'home/registrationform', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeRoutingModule {}
