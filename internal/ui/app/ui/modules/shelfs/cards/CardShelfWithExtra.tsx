"use client";

// Actions
import { useState, useEffect } from "react";
import { syncShelfWithExtra } from "@/app/lib/synchronizers/extra/shelfs/single";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import Link from "next/link";
import LabelZone from "../../labels/LabelZone";
import { Eye } from "lucide-react";
import DialogShelfReplace from "../dialogs/DialogShelfReplace";
import DialogShelfEdit from "../dialogs/DialogShelfEdit";

// Worker
import streamer from "@/app/lib/workers";

// Components
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { Button } from "@/app/ui/components/button";

// Types and interfaces
import { ShelfWithExtra } from "@/app/lib/types/data/shelfs";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Zone } from "@/app/lib/types/data/zones";
import { Aisle } from "@/app/lib/types/data/aisles";
import LabelAisle from "../../labels/LabelAisle";
import { Rack } from "@/app/lib/types/data/racks";
import LabelRack from "../../labels/LabelRack";

interface ShelfWithExtraCardProps {
  item: ShelfWithExtra, 
  dictCard: DictLabelList<"items" | "zone" | "aisle" | "rack" >
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
    shelf: SelectFieldProps<"Shelf">;
  };
};

export default function CardShelfWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields
}: ShelfWithExtraCardProps) {
  const [shelfWithExtra, setShelfWithExtra] = useState(item);

  const initialZone = fields.zone.list.find(
    (zone) => zone.id === shelfWithExtra.shelf.zone
  ) as Zone;
  const initialAisle = fields.aisle.list.find(
    (aisle) => aisle.id === shelfWithExtra.shelf.aisle
  ) as Aisle;
  const initialRack = fields.rack.list.find(
    (rack) => rack.id === shelfWithExtra.shelf.rack
  ) as Rack;

  const [zone, setZone] = useState(initialZone);
  const [aisle, setAisle] = useState(initialAisle);
  const [rack, setRack] = useState(initialRack);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    syncShelfWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: shelfWithExtra,
      setElement: setShelfWithExtra,
    });
  }, []);

  useEffect(() => {
    setZone(fields.zone.list.find(
      (zone) => zone.id === shelfWithExtra.shelf.zone
    ) as Zone);
    setAisle(fields.aisle.list.find(
      (aisle) => aisle.id === shelfWithExtra.shelf.aisle
    ) as Aisle);
    setRack(fields.rack.list.find(
      (rack) => rack.id === shelfWithExtra.shelf.rack
    ) as Rack);
  }, [shelfWithExtra]);

  const CardFooter = () => {
    return (
      <>
        <div className="flex gap-2">
          <DialogShelfReplace 
            shelf={shelfWithExtra.shelf}
            dict={dictDialogReplace}
            fields={fields}
          />
          <DialogShelfEdit 
            shelf={shelfWithExtra.shelf}
            dict={dictDialogEdit}
            fields={fields}
          />

          <Button
            size="sm"
            asChild
            className="aspect-square p-0"
          >
            <Link href={`/shelfs/${item.shelf.id}`}>
              <Eye className="w-4 h-4"/>
            </Link>
          </Button>
        </div>
      </>
    )
  }

  const CardContent = () => {
    return (
      <div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.items}</span>
          <span>{shelfWithExtra.itemsCount}</span>
        </div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.zone}</span>
          <LabelZone 
            zone={zone}
            setZone={setZone}
          />
        </div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.aisle}</span>
          <LabelAisle 
            aisle={aisle}
            setAisle={setAisle}
          />
        </div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.rack}</span>
          <LabelRack 
            rack={rack}
            setRack={setRack}
          />
        </div>
      </div>
    )
  }


  return (
    <div>
      { syncState != "hidden" && (
        <CardWrapper 
          className={
            syncState === "remove" ? "animate-delete" :
            syncState === "update" ? "animate-update" :
            ""
          }
          Header={() => {
            return (
              <CardWrapperHeader
                title={shelfWithExtra.shelf.name}
                description={shelfWithExtra.shelf.id}
              />
            )
          }}
          Content={CardContent}
          Footer={CardFooter}
        />
      )}
    </div>
  )
} 
