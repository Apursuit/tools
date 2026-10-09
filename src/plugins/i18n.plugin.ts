import messages from '@intlify/unplugin-vue-i18n/messages';
import { get } from '@vueuse/core';
import { watch } from 'vue';
import type { Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

const supportedLocales = ['de', 'en', 'es', 'fr', 'no', 'pt', 'uk', 'vi', 'zh'];

function getDefaultLocale(): string {
  try {
    const stored = window.localStorage.getItem('locale')?.replace(/"/g, '') ?? '';
    if (supportedLocales.includes(stored)) {
      return stored;
    }

    const preferred = window.navigator.language?.toLowerCase() ?? 'en';
    const match = supportedLocales.find(
      locale => preferred === locale || preferred.startsWith(`${locale}-`),
    );

    return match ?? 'en';
  }
  catch {
    return 'en';
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  messages,
});

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);

    watch(
      () => get(i18n.global.locale),
      (locale) => {
        document.documentElement.lang = locale;
      },
      { immediate: true },
    );
  },
};

export const translate = function (localeKey: string) {
  const hasKey = i18n.global.te(localeKey, get(i18n.global.locale));
  return hasKey ? i18n.global.t(localeKey) : localeKey;
};
