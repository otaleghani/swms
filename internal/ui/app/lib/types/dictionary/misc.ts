export interface DictFilters {
  title: string;
  trigger: {
    singular: string;
    plural: string;
    empty: string;
  };
  button: string;
  reset: string;
}

export interface DictDialog {
  title: string;
  description: string;
  trigger: {
    label: string;
  };
  clear: string;
};

export type DictDialogs<List extends string> = {
  [Item in List]: DictDialog;
}
export type DictDialogsPositions = DictDialogs<
"add" | "addBulk" | "replace" | "edit" >
export type DictDefaultDialogs = DictDialogs<
"add" | "replace" | "delete" | "edit" >

/** sus */
export type DictLabelList<List extends string> = {
  labels: {
    [Item in List]: string;
  }
}

export type DictBreadcrumbs<List extends string> = {
  [Item in List]: string;
}

export type DictPageHeader<List extends string> = {
  title: string;
  breadcrumbs: DictBreadcrumbs<List>;
}

export type DictPageNotFound = {
  title: string;
  description: string;
  buttonLabel: string;
}
