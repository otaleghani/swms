import 'server-only'

interface Dictionary {
  [key: string]: any;
}

type ImportDictionaryFunction = () => Promise<Dictionary>;

interface Dictionaries {
  en: ImportDictionaryFunction;
  it: ImportDictionaryFunction;
}

const dictionaries: Dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default as Dictionary),
  it: () => import('@/dictionaries/it.json').then((module) => module.default as Dictionary),
};

export type Locale = keyof Dictionaries;
export const getDictionary = async (locale: Locale) => dictionaries[locale]();

