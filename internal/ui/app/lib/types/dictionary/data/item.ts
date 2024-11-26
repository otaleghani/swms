import { DictItemsForm } from "../../form/fields";
import { DictDefaultDialogs, DictPageHeader } from "../misc";

export interface DictItem {
  header: DictPageHeader<"home" | "item" | "add">;
  form: DictItemsForm;
  dialogs: DictDefaultDialogs
}
