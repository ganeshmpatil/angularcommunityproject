import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { LocalizedComponent } from './localized.component';
import { LocaleHelper } from './locale.helper';
import { Resources } from './resources';
import { EventPublishService } from './event-publish.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends LocalizedComponent {
  title = 'communityprojectui';
  homeRouteActive: boolean = false;
  menuElements = [];
  public languages: Language[] = [
    { name: 'English', localeId: 'en-US' },
    { name: 'मराठी', localeId: 'mr' },
  ];
  constructor(
    private meta: Meta,
    private eventPublishService: EventPublishService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.homeRouteActive = true;
    this.resources = Resources;
    this.meta.addTags(
      [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      true
    );
    this.isHomeRouteActive();
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
  };
}

interface Language {
  name: string;
  localeId: string;
}
