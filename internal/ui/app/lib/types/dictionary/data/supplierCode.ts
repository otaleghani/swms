import { 
  DictDefaultDialogs, 
  DictLabelList
} from "../misc";

export interface DictSupplierCode {
  dialogs: DictDefaultDialogs;
  card: DictLabelList<"supplier" | "item" | "variant">;
}

export interface DictSupplierCodeCard {

}
