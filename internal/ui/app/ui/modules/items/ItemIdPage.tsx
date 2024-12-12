import { Item } from "@/app/lib/types/data/items";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";
import HeroItemSingle from "./heros/HeroItemSingle";
import ListOperations from "../operations/lists/ListOperations";
import { ScrollArea } from "../../components/scroll-area";

interface Props {
  item: Item;
  searchParams?: SearchParams["operations"];
  locale: Locale;
}

export default async function ItemIdPageComponent({
  item,
  searchParams,
  locale
}: Props) {
  return (
    <ScrollArea scrollHideDelay={10000} className="xl:h-[calc(100vh_-_114px)]">
      <div className="h-screen"></div>
    </ScrollArea>
  );
};
