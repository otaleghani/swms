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
//import { synchronizeAisleWithExtraSingle } from "@/app/lib/synchronizers/data/aislesWithExtra";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps, InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";

interface AisleWithExtraCardProps {
  item: AisleWithExtra, 
  dictCard: DictLabelList<"aisles" | "items">
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
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
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    //synchronizeAisleWithExtraSingle({
    //  streamer: streamer as Worker,
    //  setSyncState: setSyncState,
    //  aisleWithExtra: aisleWithExtra,
    //  setAisleWithExtra: setAisleWithExtra,
    //});

    return () => {
      streamer?.terminate();
    };
  }, []);

  return (
    <>
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
          Content={() => {
            return (
              <></>
            )
          }}
          Footer={() => {
            return (
              <></>
            )
          }}
        />
      )}
    </>
  )
} 
