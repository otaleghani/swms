import { Variant } from "../../data/variants";
import { DictDialog } from "../misc"

export interface DictVariant {
  form: {
    edit_title: string;
    add_title: string;
  }
  dialogs: {
    delete: DictDialog;
  }

  table: {
    header: Variant;
  }
}
