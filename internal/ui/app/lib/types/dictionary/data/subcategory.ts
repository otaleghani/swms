import { 
  DictDefaultDialogs,
  DictLabelList,
  DictPageHeader,
} from "../misc";

export interface DictSubcategory {
  header: DictPageHeader<"home" | "category" | "subcategory">
  card: DictLabelList<"items">;
  dialogs: DictDefaultDialogs;
}
