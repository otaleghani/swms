"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";

/** Web workers */
import streamer from "@/app/lib/workers";
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { defaultZoneFormState, Zone } from "@/app/lib/types/data/zones";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { 
  fieldsDefaultProps, 
  InputFieldProps, 
  SelectFieldProps 
} from "@/app/lib/types/form/fields";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { synchronizeElement } from "@/app/lib/synchronizers/element";

interface ZoneCardProps {
  item: Zone, 
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
  };
};

export default function CardZone({
  item,
  dictDialogEdit,
  dictDialogReplace,
  fields
}: ZoneCardProps) {
  const [zone, setZone] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeElement({
      type: "Zone",
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: zone,
      setElement: setZone,
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
                id: zone.id ? zone.id : "",
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
                  itemToDelete: zone.id as string,
                  itemThatReplaces: "",
                  type: "Zone",
                }
              }
            }
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
                  id: zone.id,
                  name: zone.name,
                }
              }
            }
          }}
        />

        <Button
          size="sm"
          asChild
        >
          <Link href={`/zones/${zone.id}`}>
            View
          </Link>
        </Button>
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
                title={zone.name}
                description={zone.id}
              />
            )
          }}
          Content={() => {return (<></>)}}
          Footer={CardFooter}
        />
      )}
    </div>
  )
} 
