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
import { ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/app/ui/components/scroll-area";
import ImageViewer from "@/app/ui/patterns/dialog/ImageViewer";

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
      <div className="p-4 border-b">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <p className="">{item.description}</p>

      </div>
    
      <div className="flex items-center p-4 border-b">
        <span className="w-full font-semibold">Position</span>
        <div className="flex gap-1 items-center">
          {currentZone !== emptyZone && (
            <LabelZone 
              zone={currentZone}
              setZone={setCurrentZone}
            />
          )}
          <ChevronRight className="h-4 w-4"/>
          {currentAisle !== emptyAisle && (
            <LabelAisle 
              aisle={currentAisle}
              setAisle={setCurrentAisle}
            />
          )}
          <ChevronRight className="h-4 w-4"/>
          {currentRack !== emptyRack && (
            <LabelRack 
              rack={currentRack}
              setRack={setCurrentRack}
            />
          )}
          <ChevronRight className="h-4 w-4"/>
          {currentShelf !== emptyShelf && (
            <LabelShelf 
              shelf={currentShelf}
              setShelf={setCurrentShelf}
            />
          )}
        </div>
      </div>

      <div className="flex items-center p-4 border-b">
        <span className="w-full font-semibold">Categories</span>
        <div className="flex gap-1 items-center">
          {currentCategory !== emptyCategory && (
            <LabelCategory 
              category={currentCategory}
              setCategory={setCurrentCategory}
            />
          )}
          <ChevronRight className="h-4 w-4"/>
          {currentSubcategory !== emptySubcategory && (
            <LabelSubcategory
              subcategory={currentSubcategory}
              setSubcategory={setCurrentSubcategory}
            />
          )}
        </div>
      </div>

      <div className="border-b">
        <div className="w-full font-semibold p-4">Images</div>
        <ScrollArea className="whitespace-nowrap rounded-md ">
          <div className="flex gap-2 w-max px-4 mb-2">
            {itemImages && itemImages.map((image) => (
              <div>
                <ImageViewer
                  imageId={image.id as string}
                  imageAlt={item.description ? item.description : "Item image"}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>

      <div className="border-b p-4">
        <div className="w-full font-semibold">Operations: the card is an example</div>

        <div className="p-2 border-b flex gap-4 items-center">
          <Image 
            height={70}
            width={70}
            className="w-4 h-4 rounded-full"
            alt="sus"
            src="http://localhost:8080/media/2F99ffc3b2-9943-4ea8-99d5-34804bf8a5e1.jpg"
          />
          <div>Quantity</div>
          <div>Item</div>
          <div>Variant</div>
        </div>
      </div>

    </div>
  );
};
