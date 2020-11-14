import { LoginComponentComponent } from './login-component/login-component.component';
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { LocalizedComponent } from './localized.component';
import { LocaleHelper } from './locale.helper';
import { Resources } from './resources';
import { EventPublishService } from './event-publish.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { LoginService } from './shared/login.service';
import { LoginService as LoginServiceMiddleware } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends LocalizedComponent {
  title = 'communityprojectui';
  homeRouteActive = false;
  menuElements = [];
  isUserLoggedIn = false;
  public languages: Language[] = [
    { name: 'English', localeId: 'en-US' },
    { name: 'मराठी', localeId: 'mr' },
  ];
  constructor(
    private meta: Meta,
    private eventPublishService: EventPublishService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private loginServiceMiddleware: LoginServiceMiddleware
  ) {
    super();
    this.homeRouteActive = true;
    this.resources = Resources;
    this.meta.addTags(
      [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      true
    );
    this.isHomeRouteActive();
    this.loginServiceMiddleware.login$.subscribe((response) => {
      console.log('Received Observer response in app component ' + response);
      this.isUserLoggedIn = true;
    });
  }

  public languageSelected($event, language: Language): void {
    // Set the new language.
    LocaleHelper.setCurrentLocale(language.localeId);

    // Reload page.
    window.location.reload();
  }

  public isHomeRouteActive = () => {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationStart && value.url === '/') {
        this.homeRouteActive = true;
      } else if (value instanceof NavigationStart && value.url !== '/') {
        this.homeRouteActive = false;
      }
    });
  }

  logout() {
    if (this.loginService.loginUserId) {
      this.loginService.loginUserId = null;
      this.isUserLoggedIn = false;
    }
  }
}

interface Language {
  name: string;
  localeId: string;
}
