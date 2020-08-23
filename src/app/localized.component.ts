import { Resources } from './resources';
import { LocaleHelper } from './locale.helper';

export class LocalizedComponent {
    public resources = Resources;
    public localeId: string = null;

    constructor() {
        this.localeId = LocaleHelper.getCurrentLocale();
      }
}
