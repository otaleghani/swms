"use client";

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { synchronizePaginatedList } from "@/app/lib/synchronizers/lists";
import { syncPaginatedItemByForeign } from "@/app/lib/synchronizers/extra/items/listByForeign";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardItem from "../cards/CardItem";

// Types and interfaces
import { Item, Items } from "@/app/lib/types/data/items";
import { ItemFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

import { Categories } from "@/app/lib/types/data/categories";
import { Zones } from "@/app/lib/types/data/zones";
import { ItemImages } from "@/app/lib/types/data/images";

type Props = | {
  type: "complete";
  filters?: ItemFiltersParams;
  pagination?: PaginationParams;
  items: Items;
  dictNotFound: string;
  categoriesList: Categories;
  zonesList: Zones;
  imagesList: ItemImages;
} | {
  type: "Zone" | "Aisle" | "Rack" | "Shelf" | "Category" | "Subcategory";
  id: string;
  filters?: ItemFiltersParams;
  pagination?: PaginationParams;
  items: Items;
  dictNotFound: string;
  categoriesList: Categories;
  zonesList: Zones;
  imagesList: ItemImages;
}

// Client function to handle changes on list client side
export default function ListItemsClient(props: Props) {
  const { type, pagination, filters, items, categoriesList, dictNotFound,
    zonesList, imagesList } = props;

  const [categories, setCategories] = useState(categoriesList);
  const [zones, setZones] = useState(zonesList);
  const [currentItems, setCurrentItems] = useState(items);

  useEffect(() => {
    synchronizeList({
      list: categories,
      setList: setCategories,
      streamer: streamer as Worker,
      type: "Category"
    });
    synchronizeList({
      list: zones,
      setList: setZones,
      streamer: streamer as Worker,
      type: "Zone"
    });

    if (type === "complete") {
      synchronizePaginatedList({
        type: "Item",
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentItems,
        setList: setCurrentItems,
      });
    } else {
      const { id } = props;
      syncPaginatedItemByForeign({
        id: id,
        type: type,
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentItems,
        setList: setCurrentItems,
      });
    }
  }, []);

  return (
    <>
      {currentItems &&
        currentItems.map((item: Item) => (
          <CardItem
            key={item.id}
            item={item}
            categories={categories}
            zones={zones}
            imageId={
              imagesList.find((i) => i.item === item.id) ?
              imagesList.find((i) => i.item === item.id)?.id as string :
              ""
            }
          />
        ))}
      {!currentItems && <><div className="p-4">{dictNotFound}</div></>}
    </>
  );
}
