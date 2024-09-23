import { 
  DictDefaultDialogs,
  DictPageHeader,
} from "../misc";

export interface DictCategory {
  header: DictPageHeader<"home" | "category">
  dialogs: DictDefaultDialogs;
}
