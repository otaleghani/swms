"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";

/** Web workers */
import streamer from "@/app/lib/workers";
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { defaultAisleFormState, AisleWithExtra } from "@/app/lib/types/data/aisles";
import { SyncState } from "@/app/lib/synchronizers/utils";
//import { synchronizeAisleWithExtraSingle } from "@/app/lib/synchronizers/extra/aislesWithExtra";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { Zone } from "@/app/lib/types/data/zones";
import ZoneNameWidget from "./ZoneNameWidget";

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
  const [zones, setZones] = useState(fields.zone.list)

  useEffect(() => {

  }, []);

  useEffect(() => {
    console.log("fired")
    setZone(fields.zone.list.find((zone) => zone.id === aisleWithExtra.aisle.zone) as Zone);
  }, [aisleWithExtra]);

  const CardFooter = () => {
    return (
      <>
      {
      //<div className="flex gap-2">
      //  <DialogFormPattern<"Replace"> 
      //    showButton
      //    self={{
      //      triggerType: "iconDelete",
      //      dict: dictDialogReplace,
      //    }}
      //    formPattern={{
      //      type: "Replace",
      //      self: {
      //        fields: {
      //          ...fieldsDefaultProps,
      //          id: aisleWithExtra.aisle.id ? aisleWithExtra.aisle.id : "",
      //          aisle: fields.aisle,
      //          button: fields.button,
      //        },
      //      },
      //      form: {
      //        formName: "Replace",
      //        formAction: replaceFormAction,
      //        initialState: {
      //          ...defaultReplaceFormState,
      //          result: {
      //            itemToDelete:aisleWithExtra.aisle.id ? aisleWithExtra.aisle.id : "",
      //            itemThatReplaces: "",
      //            type: "Aisle",
      //          }
      //        }
      //      }
      //    }}
      //  />

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

      //  <Button
      //    size="sm"
      //    asChild
      //  >
      //    <Link href={`/aisles/${item.aisle.id}`}>
      //      View
      //    </Link>
      //  </Button>
      //</div>
      }
      </>
    )
  }

  const CardContent = () => {
    return (
      <div>
        <div className="border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.racks}</span>
          <span>{aisleWithExtra.racksCount}</span>
        </div>
        <div className="border-y w-full flex justify-between py-2">
          <span>{dictCard.labels.items}</span>
          <span>{aisleWithExtra.itemsCount}</span>
        </div>
        <div className="border-y w-full flex justify-between py-2">
          <span>{dictCard.labels.zone}</span>
          <ZoneNameWidget 
            zone={zone}
            setZone={setZone}
          />
        </div>
        {zones.map(item => (
          <div key={item.id} className="truncate">{item.name}</div>
        ))}

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
