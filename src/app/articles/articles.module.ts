import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesHomeComponent } from './articles-home/articles-home.component';
import { ArticlecardComponent } from './articlecard/articlecard.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [ArticlesHomeComponent, ArticlecardComponent, RegisterComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
