import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MenuConfig } from './shared/menu-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'communityprojectui';
  menuElements = [];
  constructor(private meta: Meta) {
    this.meta.addTags(
      [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      true
    );
    this.menuElements = new MenuConfig().data;
  }
}
