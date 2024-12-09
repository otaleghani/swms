import { Item } from "@/app/lib/types/data/items";
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import HeroItemSingleClient from "./HeroItemSingleClient";
import { Zones } from "@/app/lib/types/data/zones";
import { Aisles } from "@/app/lib/types/data/aisles";
import { Racks } from "@/app/lib/types/data/racks";
import { Shelfs } from "@/app/lib/types/data/shelfs";
import { Categories } from "@/app/lib/types/data/categories";
import { Subcategories } from "@/app/lib/types/data/subcategories";
import { ItemImages } from "@/app/lib/types/data/images";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

interface Props {
  item: Item,
}

export default async function HeroItemSingle({
  item
}: Props) {
  const pZones = retrieve({ request: "Zones", paginationOff: "true" });
  const pAisles = retrieve({ request: "Aisles", paginationOff: "true" });
  const pRacks = retrieve({ request: "Racks", paginationOff: "true" });
  const pShelfs = retrieve({ request: "Shelfs", paginationOff: "true" });
  const pCategories = retrieve({ request: "Categories", paginationOff: "true" });
  const pSubcategories = retrieve({ request: "Subcategories", paginationOff: "true" });
  const pItemImages = retrieveByForeignId({ 
    request: "ItemImages", 
    foreign: "Item",
    id: item.id as string,
    paginationOff: "true" 
  });

  const [zones, aisles, racks, shelfs, categories, subcategories, itemImages] = 
    await Promise.all([pZones, pAisles, pRacks, pShelfs, pCategories, pSubcategories, pItemImages]);

  return (
    <>
      <HeroItemSingleClient 
        zones={zones.data as Zones}
        aisles={aisles.data as Aisles}
        racks={racks.data as Racks}
        shelfs={shelfs.data as Shelfs}
        categories={categories.data as Categories}
        subcategories={subcategories.data as Subcategories}
        item={item}
        itemImages={itemImages.data as ItemImages}
      />
    </>
  );
};
