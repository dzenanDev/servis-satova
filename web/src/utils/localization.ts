import i18next from 'i18next';
import en from '~/locales/en.json';

i18next.init({
  fallbackLng: 'en',
  lng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: { translation: en },
  },
});

i18next.on('languageChanged', function () {
  //
});

export default i18next;
