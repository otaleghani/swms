"use client"

import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Aisles } from "@/app/lib/types/data/aisles";
import { Categories } from "@/app/lib/types/data/categories";
import { ItemImages } from "@/app/lib/types/data/images";
import { Item } from "@/app/lib/types/data/items";
import { Racks } from "@/app/lib/types/data/racks";
import { Shelfs } from "@/app/lib/types/data/shelfs";
import { Subcategories } from "@/app/lib/types/data/subcategories";
import { Zones } from "@/app/lib/types/data/zones";
import streamer from "@/app/lib/workers";
import Image from "next/image";
import { useState, useEffect } from "react"

interface Props {
  zones: Zones;
  aisles: Aisles;
  racks: Racks;
  shelfs: Shelfs;
  categories: Categories;
  subcategories: Subcategories;
  item: Item;
  itemImages: ItemImages;
}

export default function HeroItemSingleClient({
  zones,
  aisles,
  racks,
  shelfs,
  categories,
  subcategories,
  item,
  itemImages,
}: Props) {
  const [currentZones, setCurrentZones] = useState(zones);
  const [currentAisles, setCurrentAisles] = useState(aisles);
  const [currentRacks, setCurrentRacks] = useState(racks);
  const [currentShelfs, setCurrentShelfs] = useState(shelfs);
  const [currentCategories, setCurrentCategories] = useState(categories);
  const [currentSubcategories, setCurrentSubcategories] = useState(subcategories);

  const [syncState, setSyncState] = useState("none" as SyncState);
  const [currentItem, setCurrentItem] = useState(item);
  const [currentItemImages, setCurrentItemImages] = useState(itemImages);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentZones,
      setList: setCurrentZones,
      type: "Zone",
    });
    synchronizeList<"Aisle">({
      streamer: streamer as Worker,
      list: currentAisles,
      setList: setCurrentAisles,
      type: "Aisle",
    });
    synchronizeList<"Rack">({
      streamer: streamer as Worker,
      list: currentRacks,
      setList: setCurrentRacks,
      type: "Rack",
    });
    synchronizeList<"Shelf">({
      streamer: streamer as Worker,
      list: currentShelfs,
      setList: setCurrentShelfs,
      type: "Shelf",
    });
    synchronizeList<"Category">({
      streamer: streamer as Worker,
      list: currentCategories,
      setList: setCurrentCategories,
      type: "Category",
    });
    synchronizeList<"Subcategory">({
      streamer: streamer as Worker,
      list: currentSubcategories,
      setList: setCurrentSubcategories,
      type: "Subcategory",
    });

    synchronizeElement<"Item">({
      streamer: streamer as Worker,
      element: currentItem,
      setElement: setCurrentItem,
      setSyncState: setSyncState,
      type: "Item",
    });

    // Todo: synch images
  }, []);

  // Find current zone,
  // find current

  console.log(itemImages)
  return (
    <div>
      {itemImages && itemImages.map((image) => (
        <div>
          <Image
            height={50}
            width={50}
            className="aspect-square object-cover border rounded"
            alt={item.description ? item.description : "Item image"}
            src={`http://localhost:8080/media/${image.id}.jpg`}
          />
        </div>
      ))}
    </div>
  );
};
