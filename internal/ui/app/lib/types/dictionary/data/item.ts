import { DictItemsForm } from "../../form/fields";
import { DictPageHeader } from "../misc";

export interface DictItem {
  header: DictPageHeader<"home" | "item" | "add">;
  form: DictItemsForm;
}
