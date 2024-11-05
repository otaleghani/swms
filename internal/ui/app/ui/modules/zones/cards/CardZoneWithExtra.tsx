"use client";

// Actions
import { useState, useEffect } from "react";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { synchronizeZoneWithExtra } from "@/app/lib/synchronizers/extra/zones";

// Components
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import { CardTitle, CardDescription } from "@/app/ui/components/card";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";

// Worker
import streamer from "@/app/lib/workers";

// Default values
import { defaultZoneFormState } from "@/app/lib/types/data/zones";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";

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
        <DialogFormPattern<"Replace">
          showButton
          self={{
            triggerType: "iconDelete",
            dict: dictDialogReplace,
          }}
          formPattern={{
            type: "Replace",
            self: {
              fields: {
                ...fieldsDefaultProps,
                id: zoneWithExtra.zone.id ? zoneWithExtra.zone.id : "",
                zone: fields.zone,
                button: fields.button,
              },
            },
            form: {
              formName: "Replace",
              formAction: replaceFormAction,
              initialState: {
                ...defaultReplaceFormState,
                result: {
                  itemToDelete: zoneWithExtra.zone.id
                    ? zoneWithExtra.zone.id
                    : "",
                  itemThatReplaces: "",
                  type: "Zone",
                },
              },
            },
          }}
        />

        <DialogFormPattern<"Zone">
          showButton
          self={{
            triggerType: "iconEdit",
            dict: dictDialogEdit,
          }}
          formPattern={{
            type: "Zone",
            self: {
              fields: {
                ...fieldsDefaultProps,
                name: fields.name,
                button: fields.button,
              },
            },
            form: {
              formName: "Zone",
              formAction: updateFormAction,
              initialState: {
                ...defaultZoneFormState,
                result: {
                  id: zoneWithExtra.zone.id,
                  name: zoneWithExtra.zone.name,
                },
              },
            },
          }}
        />
        <Button size="sm" asChild>
          <Button
            size="sm"
            asChild
            className="aspect-square p-0"
          >
            <Link href={`/zones/${item.zone.id}`}>
              <Eye className="w-4 h-4"/>
            </Link>
          </Button>
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
