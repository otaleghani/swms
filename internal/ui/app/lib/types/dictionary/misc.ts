export interface DictDialog {
  title: string;
  description: string;
  trigger: {
    label: string;
  };
};

export type DictDialogs<List extends string> = {
  [Item in List]: DictDialog;
}
export type DictDialogsPositions = DictDialogs<
"add" | "addBulk" | "replace" | "edit" >
export type DictDefaultDialogs = DictDialogs<
"add" | "replace" | "edit" >

export type DictLabelList<List extends string> = {
  labels: {
    [Item in List]: DictDialog;
  }
}

export type DictBreadcrumbs<List extends string> = {
  [Item in List]: string;
}

export type DictPageHeader<List extends string> = {
  title: string;
  breadcrumbs: DictBreadcrumbs<List>;
}
