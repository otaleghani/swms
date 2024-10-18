import { SearchParams } from "./types/pageParams";


type AnyObject = Record<string, any>;

/** 
* Helper function used to merge a partial state to the main query 
* parameters. 
**/
export const deepMerge = (target: AnyObject, source: Partial<AnyObject>): AnyObject => {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) {
        Object.assign(target, { [key]: {} });
      }
      target[key] = deepMerge(target[key], source[key] as any);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
};

/** Encodes SearchParams instance to base64 */
export const encodeSearchParams = (params: SearchParams): string => {
  const jsonString = JSON.stringify(params);
  return Buffer.from(jsonString).toString('base64');
};

/** Decode base64 search params to SearchParams type */
export const decodeSearchParams = (
  encoded: string | null
): SearchParams => {
  if (!encoded) {
    return {} as SearchParams;
  }
  const jsonString = Buffer.from(encoded, 'base64').toString('utf-8');
  return JSON.parse(jsonString);
};
