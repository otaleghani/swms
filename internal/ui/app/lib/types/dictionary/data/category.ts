import { 
  DictDefaultDialogs,
  DictPageHeader,
  DictLabelList
} from "../misc";

export interface DictCategory {
  header: DictPageHeader<"home" | "category">
  card: DictLabelList<"subcategories" | "items">
  dialogs: DictDefaultDialogs;
}
