import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'registry',
    loadChildren: () =>
      import('./citizen-registry/citizen-registry.module').then(
        (m) => m.CitizenRegistryModule
      ),
  },
  {
    path: 'matrimony',
    loadChildren: () =>
      import('./matrimony/matrimony.module').then((m) => m.MatrimonyModule),
  },
  {
    path: 'trade',
    loadChildren: () =>
      import('./trade/trade.module').then((m) => m.TradeModule),
  },
  {
    path: 'blooddetails',
    loadChildren: () =>
      import('./blood/blood.module').then((m) => m.BloodModule),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./articles/articles.module').then((m) => m.ArticlesModule),
  },
  {
    path: 'advertise',
    loadChildren: () =>
      import('./advertise/advertise.module').then((m) => m.AdvertiseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
