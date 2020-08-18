import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitizenregistryhomeComponent } from './citizenregistryhome/citizenregistryhome.component';
import { RegisterformComponent } from './registerform/registerform.component';
const routes: Routes = [
  { path: 'home', component: CitizenregistryhomeComponent },
  { path: 'home/registrationform', component: RegisterformComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenRegistryRoutingModule {}
