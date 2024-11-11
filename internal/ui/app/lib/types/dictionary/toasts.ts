export interface DictToasts {
  fetching: DictFetchingToasts;
}

/** Used by the syncronizer to notify how to fetch went */
export interface DictFetchingToasts {
  success: DictToast;
  error: DictToast;
  empty: DictToast;
}

export interface DictToast {
  title: string;
  description: string;
  button: string;
}
