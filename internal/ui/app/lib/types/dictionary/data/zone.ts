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
