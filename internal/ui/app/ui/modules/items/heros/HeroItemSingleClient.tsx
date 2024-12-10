"use client"

import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Aisle, Aisles, emptyAisle } from "@/app/lib/types/data/aisles";
import { Categories, Category, emptyCategory } from "@/app/lib/types/data/categories";
import { ItemImages } from "@/app/lib/types/data/images";
import { Item } from "@/app/lib/types/data/items";
import { emptyRack, Rack, Racks } from "@/app/lib/types/data/racks";
import { emptyShelf, Shelf, Shelfs } from "@/app/lib/types/data/shelfs";
import { emptySubcategory, Subcategories, Subcategory } from "@/app/lib/types/data/subcategories";
import { emptyZone, Zone, Zones } from "@/app/lib/types/data/zones";
import streamer from "@/app/lib/workers";
import Image from "next/image";
import { useState, useEffect } from "react"
import LabelZone from "../../labels/LabelZone";
import LabelAisle from "../../labels/LabelAisle";
import LabelRack from "../../labels/LabelRack";
import LabelShelf from "../../labels/LabelShelf";
import LabelCategory from "../../labels/LabelCategory";
import LabelSubcategory from "../../labels/LabelSubcategory";

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
  }, []);

  // Find current zone,
  // find current
  
  const [currentZone, setCurrentZone] = useState(
    currentZones.find(e => e.id === item.zone) ? 
      currentZones.find(e => e.id === item.zone) as Zone : emptyZone
  );
  const [currentAisle, setCurrentAisle] = useState(
    currentAisles.find(e => e.id === item.aisle) ?
      currentAisles.find(e => e.id === item.aisle) as Aisle : emptyAisle
  );
  const [currentRack, setCurrentRack] = useState(
    currentRacks.find(e => e.id === item.rack) ?
      currentRacks.find(e => e.id === item.rack) as Rack : emptyRack
  );
  const [currentShelf, setCurrentShelf] = useState(
    currentShelfs.find(e => e.id === item.shelf) ?
      currentShelfs.find(e => e.id === item.shelf) as Shelf : emptyShelf
  );
  const [currentCategory, setCurrentCategory] = useState(
    currentCategories.find(e => e.id === item.category) ?
      currentCategories.find(e => e.id === item.category) as Category : emptyCategory
  );
  const [currentSubcategory, setCurrentSubcategory] = useState(
    currentSubcategories.find(e => e.id === item.subcategory) ?
      currentSubcategories.find(e => e.id === item.subcategory) as Subcategory : emptySubcategory
  );

  return (
    <div>
      <div>
        {currentZone !== emptyZone && (
          <LabelZone 
            zone={currentZone}
            setZone={setCurrentZone}
          />
        )}
        {currentAisle !== emptyAisle && (
          <LabelAisle 
            aisle={currentAisle}
            setAisle={setCurrentAisle}
          />
        )}
        {currentRack !== emptyRack && (
          <LabelRack 
            rack={currentRack}
            setRack={setCurrentRack}
          />
        )}
        {currentShelf !== emptyShelf && (
          <LabelShelf 
            shelf={currentShelf}
            setShelf={setCurrentShelf}
          />
        )}
        {currentCategory !== emptyCategory && (
          <LabelCategory 
            category={currentCategory}
            setCategory={setCurrentCategory}
          />
        )}
        {currentSubcategory !== emptySubcategory && (
          <LabelSubcategory
            subcategory={currentSubcategory}
            setSubcategory={setCurrentSubcategory}
          />
        )}
      </div>
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
