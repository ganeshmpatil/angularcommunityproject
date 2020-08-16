import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitizenregistryhomeComponent } from './citizenregistryhome/citizenregistryhome.component';

const routes: Routes = [
  { path: 'home', component: CitizenregistryhomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenRegistryRoutingModule {}
