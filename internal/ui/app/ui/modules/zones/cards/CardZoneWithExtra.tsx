"use client";

// Actions
import { useState, useEffect } from "react";
import { synchronizeZoneWithExtra } from "@/app/lib/synchronizers/extra/zones";

// Components
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import { CardTitle, CardDescription } from "@/app/ui/components/card";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogZoneReplace from "../dialogs/DialogZoneReplace";
import DialogZoneEdit from "../dialogs/DialogZoneEdit";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps, } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Eye } from "lucide-react";

interface ZoneWithExtraCardProps {
  item: ZoneWithExtra;
  dictCard: DictLabelList<"aisles" | "items">;
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
  };
}

export default function CardZoneWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields,
}: ZoneWithExtraCardProps) {
  const [zoneWithExtra, setZoneWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeZoneWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: zoneWithExtra,
      setElement: setZoneWithExtra,
    });
  }, []);

  const CardFooter = () => {
    return (
      <div className="flex gap-2">
        <DialogZoneReplace 
          zone={zoneWithExtra.zone}
          fields={fields}
          dict={dictDialogReplace}
        />
        <DialogZoneEdit
          zone={zoneWithExtra.zone}
          fields={fields}
          dict={dictDialogEdit}
        />
        <Button size="sm" asChild className="aspect-square p-0">
          <Link href={`/zones/${item.zone.id}`}>
            <Eye className="w-4 h-4"/>
          </Link>
        </Button>
      </div>
    );
  };

  const CardContent = () => {
    return (
      <div>
        <div className="border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.aisles}</span>
          <span>{zoneWithExtra.aislesCount}</span>
        </div>
        <div className="border-y w-full flex justify-between py-2">
          <span>{dictCard.labels.items}</span>
          <span>{zoneWithExtra.itemsCount}</span>
        </div>
      </div>
    );
  };

  const CardHeader = () => {
    return (
      <>
        <CardTitle>
          <span className="text-2xl font-semibold tracking-tight">
            {zoneWithExtra.zone.name}
          </span>
        </CardTitle>
        <CardDescription>{zoneWithExtra.zone.id}</CardDescription>
      </>
    );
  };

  if (syncState != "hidden") {
    return (
      <>
        {
          <CardWrapper
            className={
              syncState === "remove"
                ? "animate-delete"
                : syncState === "update"
                  ? "animate-update"
                  : ""
            }
            Header={CardHeader}
            Content={CardContent}
            Footer={CardFooter}
          />
        }
      </>
    );
  }
}
