import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloodHomeComponent } from './blood-home/blood-home.component';
import { BloodRegisterComponent } from './blood-register/blood-register.component';

const routes: Routes = [
  { path: 'home', component: BloodHomeComponent },
  { path: 'home/registrationform', component: BloodRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodRoutingModule {}
