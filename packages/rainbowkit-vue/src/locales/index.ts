import { I18n } from './I18n';
import en_US from './en_US.json';

export type Locale =
  | 'ar'
  | 'ar-AR'
  | 'de'
  | 'de-DE'
  | 'en'
  | 'en-US'
  | 'es'
  | 'es-419'
  | 'fr'
  | 'fr-FR'
  | 'hi'
  | 'hi-IN'
  | 'id'
  | 'id-ID'
  | 'ja'
  | 'ja-JP'
  | 'ko'
  | 'ko-KR'
  | 'ms'
  | 'ms-MY'
  | 'pt'
  | 'pt-BR'
  | 'ru'
  | 'ru-RU'
  | 'th'
  | 'th-TH'
  | 'tr'
  | 'tr-TR'
  | 'ua'
  | 'uk-UA'
  | 'vi'
  | 'vi-VN'
  | 'zh'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW'
  | 'zh-Hans'
  | 'zh-Hant';

export const i18n = new I18n({
    en: en_US,
    'en-US': en_US,
});

i18n.defaultLocale = 'en-US';
i18n.locale = 'en-US';
i18n.enableFallback = true;

const fetchTranslations = async (locale: Locale): Promise<any> => {
  switch (locale) {
    case 'ar':
    case 'ar-AR':
      return (await import('./ar_AR.json')).default;
    case 'de':
    case 'de-DE':
      return (await import('./de_DE.json')).default;
    case 'en':
    case 'en-US':
      return (await import('./en_US.json')).default;
    case 'es':
    case 'es-419':
      return (await import('./es_419.json')).default;
    case 'fr':
    case 'fr-FR':
      return (await import('./fr_FR.json')).default;
    case 'hi':
    case 'hi-IN':
      return (await import('./hi_IN.json')).default;
    case 'id':
    case 'id-ID':
      return (await import('./id_ID.json')).default;
    case 'ja':
    case 'ja-JP':
      return (await import('./ja_JP.json')).default;
    case 'ko':
    case 'ko-KR':
      return (await import('./ko_KR.json')).default;
    case 'ms':
    case 'ms-MY':
      return (await import('./ms_MY.json')).default;
    case 'pt':
    case 'pt-BR':
      return (await import('./pt_BR.json')).default;
    case 'ru':
    case 'ru-RU':
      return (await import('./ru_RU.json')).default;
    case 'th':
    case 'th-TH':
      return (await import('./th_TH.json')).default;
    case 'tr':
    case 'tr-TR':
      return (await import('./tr_TR.json')).default;
    case 'ua':
    case 'uk-UA':
      return (await import('./uk_UA.json')).default;
    case 'vi':
    case 'vi-VN':
      return (await import('./vi_VN.json')).default;
    case 'zh':
    case 'zh-CN':
    case 'zh-Hans':
      return (await import('./zh_CN.json')).default;
    case 'zh-HK':
      return (await import('./zh_HK.json')).default;
    case 'zh-Hant':
    case 'zh-TW':
      return (await import('./zh_TW.json')).default;
    default:
      return (await import('./en_US.json')).default;
  }
};

export async function setLocale(locale: Locale) {
  // If i18n translation already exists no need to refetch the local files again
  const isCached = i18n.isLocaleCached(locale);
  if (isCached) {
    i18n.updateLocale(locale);
    return;
  }
  const translations = await fetchTranslations(locale);
  i18n.setTranslations(locale, JSON.parse(translations));
}
