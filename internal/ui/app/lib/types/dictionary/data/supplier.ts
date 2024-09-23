import { 
  DictPageHeader, 
  DictLabelList, 
  DictDefaultDialogs 
} from "../misc";

export interface DictSupplier {
  header: DictPageHeader<"home" | "supplier">;
  card: DictLabelList<"codes">;
  dialogs: DictDefaultDialogs;
}
