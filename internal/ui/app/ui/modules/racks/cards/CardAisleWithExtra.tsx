"use client";

// Actions
import { useState, useEffect } from "react";
import { synchronizeAisleWithExtra } from "@/app/lib/synchronizers/extra/aisles";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import Link from "next/link";
import LabelZone from "../../labels/LabelZone";
import { Eye } from "lucide-react";
import DialogAisleReplace from "../dialogs/DialogAisleReplace";
import DialogAisleEdit from "../dialogs/DialogAisleEdit";

// Worker
import streamer from "@/app/lib/workers";

// Components
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { Button } from "@/app/ui/components/button";

// Types and interfaces
import { AisleWithExtra } from "@/app/lib/types/data/aisles";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Zone } from "@/app/lib/types/data/zones";

interface AisleWithExtraCardProps {
  item: AisleWithExtra, 
  dictCard: DictLabelList<"racks" | "items" | "zone">
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
  };
};

export default function CardAisleWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields
}: AisleWithExtraCardProps) {
  const [aisleWithExtra, setAisleWithExtra] = useState(item);

  const initialItem = fields.zone.list.find((zone) => zone.id === aisleWithExtra.aisle.zone) as Zone;

  const [zone, setZone] = useState(initialItem);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeAisleWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: aisleWithExtra,
      setElement: setAisleWithExtra,
    });
  }, []);

  useEffect(() => {
    setZone(fields.zone.list.find(
      (zone) => zone.id === aisleWithExtra.aisle.zone
    ) as Zone);
  }, [aisleWithExtra]);

  const CardFooter = () => {
    return (
      <>
        <div className="flex gap-2">
          <DialogAisleReplace 
            aisle={aisleWithExtra.aisle}
            dict={dictDialogReplace}
            fields={fields}
          />
          <DialogAisleEdit 
            aisle={aisleWithExtra.aisle}
            dict={dictDialogEdit}
            fields={fields}
          />

          <Button
            size="sm"
            asChild
            className="aspect-square p-0"
          >
            <Link href={`/aisles/${item.aisle.id}`}>
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
          <span>{dictCard.labels.racks}</span>
          <span>{aisleWithExtra.racksCount}</span>
        </div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.items}</span>
          <span>{aisleWithExtra.itemsCount}</span>
        </div>
        <div className="last:border-y border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.zone}</span>
          <LabelZone 
            zone={zone}
            setZone={setZone}
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
                title={aisleWithExtra.aisle.name}
                description={aisleWithExtra.aisle.id}
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
