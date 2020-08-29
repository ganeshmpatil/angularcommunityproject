import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatrimonyHomeComponent } from './matrimony-home/matrimony-home.component';

const routes: Routes = [{ path: 'home', component: MatrimonyHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonyRoutingModule {}
