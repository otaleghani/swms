"use client"

import { useState, useEffect } from "react";

import { Item } from "@/app/lib/types/data/items"
import { Categories, Category } from "@/app/lib/types/data/categories";
import { Zone, Zones } from "@/app/lib/types/data/zones";
import LabelZone from "../../labels/LabelZone";
import LabelCategory from "../../labels/LabelCategory";
import { synchronizeElement } from "@/app/lib/synchronizers/element";
import streamer from "@/app/lib/workers";
import { SyncState } from "@/app/lib/synchronizers/utils";
import Image from "next/image";

interface Props {
  item: Item;
  categories: Categories;
  zones: Zones;
  imageId: string;
}

export default function CardItem(props: Props) {
  const {item, categories, zones, imageId} = props;

  const [syncState, setSyncState] = useState("none" as SyncState);
  const [currentItem, setCurrentItem] = useState(item)
  const [category, setCategory] = 
    useState(categories.find((i) => i.id === item.category) as Category)
  const [zone, setZone] = 
    useState(zones.find((i) => i.id === item.zone) as Zone)

  useEffect(() => {
    synchronizeElement({
      streamer: streamer as Worker,
      element: currentItem,
      setElement: setCurrentItem,
      setSyncState: setSyncState,
      type: "Item"
    })
  }, [])

  return (
    <div
      className={
        syncState === "remove"
          ? "animate-delete"
          : syncState === "update"
            ? "animate-update"
            : ""
      }
    >
      <Image
        height={50}
        width={50}
        className=""
        alt={item.description ? item.description : "Item image"}
        src={`http://localhost:8080/media/${imageId}.jpg`}
      />
      {zone && (
        <LabelZone 
          zone={zone}
          setZone={setZone}
        />
      )}

      {category && (
        <LabelCategory 
          category={category}
          setCategory={setCategory}
        />
      )}
    </div>
  )
}
