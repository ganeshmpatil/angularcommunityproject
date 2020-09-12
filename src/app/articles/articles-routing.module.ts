import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesHomeComponent } from './articles-home/articles-home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: ArticlesHomeComponent },
  { path: 'home/registrationform', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
