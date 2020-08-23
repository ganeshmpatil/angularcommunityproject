export abstract class LocaleHelper {
    public static defaultLocaleId = 'en-US';
    public static implementedLocales = ['hi', LocaleHelper.defaultLocaleId];


    public static setCurrentLocale(localeId: string) {
        localStorage.setItem('__localeId', localeId);
    }

    public static isDefaultLocaleSet(): boolean {
        return LocaleHelper.getCurrentLocale() === this.defaultLocaleId;
    }

    public static getCurrentLocale(): string {
        // Retrieve localeId from the url if any; otherwise, default to 'en-US'.
        // The first time the app loads, check the browser language.
        const storedLocaleId = <string>localStorage.getItem('__localeId');
        if (storedLocaleId == null) {
            let partialLocaleMatch = null;
            // tslint:disable-next-line:forin
            for (const id in LocaleHelper.implementedLocales) {
                const implemetedLocaleId = LocaleHelper.implementedLocales[id];
                if (navigator.language === implemetedLocaleId) {
                    // Exact match, return.
                    return implemetedLocaleId;
                } else if (navigator.language.startsWith(implemetedLocaleId)) {
                    // For example, browser has `es-CL` and the implemented locale is `es`.
                    partialLocaleMatch = implemetedLocaleId;
                } else if (implemetedLocaleId.startsWith(navigator.language)) {
                    // For example, browser has `es` and the implemented locale is `es-CL`.
                    partialLocaleMatch = implemetedLocaleId;
                }
            }
            if (partialLocaleMatch != null) { return partialLocaleMatch; }
        }
        return storedLocaleId || this.defaultLocaleId;
    }
}
