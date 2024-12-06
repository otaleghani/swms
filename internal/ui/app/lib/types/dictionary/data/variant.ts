import { DictDefaultDialogs, DictLabelList } from "../misc"

export interface DictVariant {
  card: DictLabelList<"dimensions" | "weight" | "quantity" | "identifier">;
  dialogs: DictDefaultDialogs;
}
