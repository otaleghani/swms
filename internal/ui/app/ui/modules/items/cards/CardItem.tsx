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
import { Button } from "@/app/ui/components/button";
import { EditIcon, Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/app/ui/components/badge";

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
      <div className="grid xl:grid-cols-2 border-b p-4 gap-4 items-center w-full">
        <div className="flex gap-2 items-center">
          <Image
            height={50}
            width={50}
            className="aspect-square object-cover border rounded"
            alt={item.description ? item.description : "Item image"}
            src={`http://localhost:8080/media/${imageId}.jpg`}
          />

          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs">{item.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div>
            <p className="text-xs pb-1">Zone</p>
            {zone ? (
              <LabelZone 
                zone={zone}
                setZone={setZone}
              />
            ) : <Badge variant="secondary">sus</Badge>}
          </div>
          <div>
            <p className="text-xs pb-1">Category</p>
            {category ? (
              <LabelCategory 
                category={category}
                setCategory={setCategory}
              />
            ) : <Badge variant="secondary">sus</Badge>}
          </div>

          <div className="flex gap-2 w-full justify-end">
            <Button 
              size="sm"
              variant="outline"
              className="aspect-square p-0 h-10 w-10"
            >
              <Link href={`/items/${item.id}/edit`}>
                <EditIcon className="w-4 h-4"/>
              </Link>
            </Button>

            <Button size="sm" asChild className="aspect-square p-0 h-10 w-10">
              <Link href={`/items/${item.id}`}>
                <Eye className="w-4 h-4"/>
              </Link>
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  )
}
