"use client";

// Actions
import { useState, useEffect } from "react";
import { syncRackWithExtra } from "@/app/lib/synchronizers/extra/racks/single";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import Link from "next/link";
import LabelZone from "../../labels/LabelZone";
import { Eye } from "lucide-react";
import DialogRackReplace from "../dialogs/DialogRackReplace";
import DialogRackEdit from "../dialogs/DialogRackEdit";

// Worker
import streamer from "@/app/lib/workers";

// Components
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { Button } from "@/app/ui/components/button";

// Types and interfaces
import { RackWithExtra } from "@/app/lib/types/data/racks";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Zone } from "@/app/lib/types/data/zones";
import { Aisle } from "@/app/lib/types/data/aisles";
import LabelAisle from "../../labels/LabelAisle";

interface RackWithExtraCardProps {
  item: RackWithExtra, 
  dictCard: DictLabelList<"shelfs" | "items" | "zone" | "aisle">
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
    rack: SelectFieldProps<"Rack">;
  };
};

export default function CardRackWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields
}: RackWithExtraCardProps) {
  const [rackWithExtra, setRackWithExtra] = useState(item);

  const initialZone = fields.zone.list.find(
    (zone) => zone.id === rackWithExtra.rack.zone
  ) as Zone;
  const initialAisle = fields.aisle.list.find(
    (aisle) => aisle.id === rackWithExtra.rack.aisle
  ) as Aisle;

  const [zone, setZone] = useState(initialZone);
  const [aisle, setAisle] = useState(initialAisle);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    syncRackWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: rackWithExtra,
      setElement: setRackWithExtra,
    });
  }, []);

  useEffect(() => {
    setZone(fields.zone.list.find(
      (zone) => zone.id === rackWithExtra.rack.zone
    ) as Zone);
    setAisle(fields.aisle.list.find(
      (aisle) => aisle.id === rackWithExtra.rack.aisle
    ) as Aisle);
  }, [rackWithExtra]);

  const CardFooter = () => {
    return (
      <>
        <div className="flex gap-2">
          <DialogRackReplace 
            rack={rackWithExtra.rack}
            dict={dictDialogReplace}
            fields={fields}
          />
          <DialogRackEdit 
            rack={rackWithExtra.rack}
            dict={dictDialogEdit}
            fields={fields}
          />

          <Button
            size="sm"
            asChild
            className="aspect-square p-0"
          >
            <Link href={`/racks/${item.rack.id}`}>
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
          <span>{dictCard.labels.shelfs}</span>
          <span>{rackWithExtra.shelfsCount}</span>
        </div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.items}</span>
          <span>{rackWithExtra.itemsCount}</span>
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
                title={rackWithExtra.rack.name}
                description={rackWithExtra.rack.id}
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
