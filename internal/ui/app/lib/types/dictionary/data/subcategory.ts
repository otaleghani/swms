import { 
  DictDefaultDialogs,
  DictPageHeader,
} from "../misc";

export interface DictSubcategory {
  header: DictPageHeader<"home" | "category" | "subcategory">
  dialogs: DictDefaultDialogs;
}
