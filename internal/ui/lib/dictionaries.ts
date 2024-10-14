import "server-only"

import { Dictionary } from "@/app/lib/types/dictionary";

//interface Dictionary {
//  [key: string]: any;
//}

type ImportDictionaryFunction = () => Promise<Dictionary>;

interface Dictionaries {
  en: ImportDictionaryFunction;
  it: ImportDictionaryFunction;
}

const dictionaries: Dictionaries = {
  en: () => import('@/dictionaries/en').then((module) => module.dictionary as Dictionary),
  it: () => import('@/dictionaries/it.json').then((module) => module.default as any),
};

export type Locale = keyof Dictionaries;
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
