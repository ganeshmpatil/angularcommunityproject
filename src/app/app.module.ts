import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterhomeComponent } from './footer/footerhome/footerhome.component';
import { AboutusComponent } from './footer/aboutus/aboutus.component';
import { ContactusComponent } from './footer/contactus/contactus.component';
import { CopyrightComponent } from './footer/copyright/copyright.component';
import { CitizenRegistryModule } from './citizen-registry/citizen-registry.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterhomeComponent,
    AboutusComponent,
    ContactusComponent,
    CopyrightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CitizenRegistryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
