import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatrimonyHomeComponent } from './matrimony-home/matrimony-home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: MatrimonyHomeComponent },
  { path: 'home/registrationform', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonyRoutingModule {}
