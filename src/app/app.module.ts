import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import localeMr from '@angular/common/locales/mr';
import localeMrExtra from '@angular/common/locales/extra/mr';
import { registerLocaleData } from '@angular/common';
import { Resources } from './resources';
import { LocaleHelper } from './locale.helper';
import { EventPublishService } from './event-publish.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterhomeComponent } from './footer/footerhome/footerhome.component';
import { AboutusComponent } from './footer/aboutus/aboutus.component';
import { ContactusComponent } from './footer/contactus/contactus.component';
import { CopyrightComponent } from './footer/copyright/copyright.component';
import { CitizenRegistryModule } from './citizen-registry/citizen-registry.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuConfig } from './shared/menu-config';
import { SharedModule } from './shared/shared.module';
import { Observable, Subject } from 'rxjs';
import { AdvertiseModule } from './advertise/advertise.module';
import { BannerComponent } from './advertise/banner/banner.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HistoryComponent } from './history/history.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FooterhomeComponent,
    AboutusComponent,
    ContactusComponent,
    CopyrightComponent,
    LoginComponentComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CitizenRegistryModule,
    FormsModule,
    ReactiveFormsModule,
    AdvertiseModule,
    SharedModule,
    SocketIoModule.forRoot(config),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(eventPublishService: EventPublishService) {
    registerLocaleData(localeMr, 'mr', localeMrExtra);
    import(
      `../assets/resources.${LocaleHelper.getCurrentLocale().toLowerCase()}.js`
    ).then((r) => {
      console.log('Setting resources values...');
      // Load `Resources` with values.
      for (const key in r.resources) {
        if (r.resources.hasOwnProperty(key)) {
          Resources[key] = r.resources[key];
        }
      }
      eventPublishService.sendResourceBundleLoadEvent();
      console.log('Matrimony module label ..' + Resources.MatrimonyModuleLabel);
    });
  }
}
