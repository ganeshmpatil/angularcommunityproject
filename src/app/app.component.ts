import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MenuConfig } from './shared/menu-config';
import { LocalizedComponent } from './localized.component';
import { LocaleHelper } from './locale.helper';

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
  constructor(private meta: Meta) {
    super();
    this.meta.addTags(
      [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      true
    );
    this.menuElements = new MenuConfig().data;
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
