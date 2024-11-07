"use client";

// Actions
import { useState, useEffect } from "react";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { synchronizeAisleWithExtra } from "@/app/lib/synchronizers/extra/aisles";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import Link from "next/link";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import LabelZone from "../../labels/LabelZone";
import { Eye } from "lucide-react";

// Worker
import streamer from "@/app/lib/workers";

// Default values
import { defaultAisleFormState } from "@/app/lib/types/data/aisles";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";

// Components
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { Button } from "@/app/ui/components/button";

// Types and interfaces
import { AisleWithExtra } from "@/app/lib/types/data/aisles";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
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
                  id: aisleWithExtra.aisle.id ? aisleWithExtra.aisle.id : "",
                  zone: fields.zone,
                  aisle: fields.aisle,
                  button: fields.button,
                },
              },
              form: {
                formName: "Replace",
                formAction: replaceFormAction,
                initialState: {
                  ...defaultReplaceFormState,
                  result: {
                    itemToDelete:aisleWithExtra.aisle.id ? aisleWithExtra.aisle.id : "",
                    itemThatReplaces: "",
                    type: "Aisle",
                  }
                }
              }
            }}
          />

          <DialogFormPattern<"Aisle"> 
            showButton
            self={{
              triggerType: "iconEdit",
              dict: dictDialogEdit,
            }}
            formPattern={{
              type: "Aisle",
              self: {
                fields: {
                  ...fieldsDefaultProps,
                  name: fields.name,
                  zone: fields.zone,
                  button: fields.button,
                },
              },
              form: {
                formName: "Aisle",
                formAction: updateFormAction,
                initialState: {
                  ...defaultAisleFormState,
                  result: {
                    id: aisleWithExtra.aisle.id,
                    zone: aisleWithExtra.aisle.zone,
                    name: aisleWithExtra.aisle.name,
                  }
                }
              }
            }}
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
