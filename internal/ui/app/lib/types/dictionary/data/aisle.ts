import { DictInputField, DictFormButton } from "../form";

import { 
  DictPageHeader, 
  DictDialogsPositions, 
  DictLabelList 
} from "../misc";

export interface DictAisle {
  header: DictPageHeader<"home" | "zone" | "aisle">;
  card: DictLabelList<"zone" | "racks" | "items">
  dialogs: DictDialogsPositions;
}

export interface DictBulkAisleForm {
  number: DictInputField;
  button: DictFormButton;
}

export interface DictAisleForm {
  name: DictInputField;
  button: DictFormButton;
}
