import { 
  DictPageHeader, 
  DictDialogsPositions, 
  DictLabelList 
} from "../misc";

export interface DictRack {
  header: DictPageHeader<"home" | "zone" | "aisle" | "rack">;
  card: DictLabelList<"zone" | "aisle" | "shelfs" | "items">
  dialogs: DictDialogsPositions;
}
