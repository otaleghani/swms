import { DictInputField, DictFormButton } from "../form";

import { 
  DictPageHeader, 
  DictDialogsPositions, 
  DictLabelList 
} from "../misc";

export interface DictZone {
  header: DictPageHeader<"home" | "zone">;
  card: DictLabelList<"aisles" | "items">
  dialogs: DictDialogsPositions;
}

export interface DictBulkZoneForm {
  number: DictInputField;
  button: DictFormButton;
}

export interface DictZoneForm {
  name: DictInputField;
  button: DictFormButton;
}
