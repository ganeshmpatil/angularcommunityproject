import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodHomeComponent } from './blood-home/blood-home.component';

const routes: Routes = [{ path: 'home', component: BloodHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodRoutingModule {}
