import {tr, en} from '../../assets/localizations';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';
const translationGetters: any = {
  tr: () => tr,
  en: () => en,
};

const setI18nConfig = () => {
  const fallback = {languageTag: 'tr', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  I18nManager.forceRTL(isRTL);

  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

setI18nConfig();
const t = (key: string) => {
  const result = i18n.t(key);
  if (result.indexOf('[missing ') > -1) {
    return key;
  }
  return result;
};
export default t;
