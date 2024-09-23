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
