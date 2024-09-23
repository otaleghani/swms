import { 
  DictPageHeader, 
  DictDialogsPositions, 
  DictLabelList 
} from "../misc";

export interface DictShelf {
  header: DictPageHeader<"home" | "zone" | "aisle" | "rack" | "shelf">;
  card: DictLabelList<"zone" | "aisle" | "rack" | "items">
  dialogs: DictDialogsPositions;
}
