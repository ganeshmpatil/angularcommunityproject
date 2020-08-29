import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { LocalizedComponent } from './localized.component';
import { LocaleHelper } from './locale.helper';
import { Resources } from './resources';
import { EventPublishService } from './event-publish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends LocalizedComponent {
  title = 'communityprojectui';
  menuElements = [];
  public languages: Language[] = [
    { name: 'English', localeId: 'en-US' },
    { name: 'मराठी', localeId: 'mr' },
  ];
  constructor(
    private meta: Meta,
    private eventPublishService: EventPublishService
  ) {
    super();
    this.resources = Resources;
    this.meta.addTags(
      [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      true
    );
  }

  public languageSelected($event, language: Language): void {
    // Set the new language.
    LocaleHelper.setCurrentLocale(language.localeId);

    // Reload page.
    window.location.reload();
  }
}

interface Language {
  name: string;
  localeId: string;
}
