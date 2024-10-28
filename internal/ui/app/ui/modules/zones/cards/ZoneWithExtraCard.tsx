"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Components */
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";

/** Web workers */
import streamer from "@/app/lib/workers";
import CardWrapperHeader from "@/app/ui/wrappers/cards/CardWrapperHeader";
import { defaultZoneFormState, ZoneWithExtra } from "@/app/lib/types/data/zones";
import { delaySyncStateToNone, SyncState } from "@/app/lib/synchronizers/utils";
import { synchronizeZoneWithExtraSingle } from "@/app/lib/synchronizers/data/zonesWithExtra";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { updateFormAction } from "@/app/lib/actions/update/updateFormAction";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";

interface ZoneWithExtraCardProps {
  item: ZoneWithExtra, 

  dictCard: DictLabelList<"aisles" | "items">
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictButton: DictFormButton;
  dictFields: {
    name: DictInputField;
    button: DictFormButton;
  };
};

export default function ZoneWithExtraCard({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  dictButton,
  dictFields,
}: ZoneWithExtraCardProps) {
  const [zoneWithExtra, setZoneWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    synchronizeZoneWithExtraSingle({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      zoneWithExtra: zoneWithExtra,
      setZoneWithExtra: setZoneWithExtra,
    });

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
                title={zoneWithExtra.zone.name}
                description={zoneWithExtra.zone.id}
              />
            )
          }}
          Content={() => {
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
            )
          }}
          Footer={() => {
            return (
              <div>
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
                        name: {
                          dict: dictFields.name,
                        },
                        button: dictFields.button,
                      },
                    },
                    form: {
                      formName: "Zone",
                      formAction: updateFormAction,
                      initialState: {
                        ...defaultZoneFormState,
                        result: {
                          id: item.zone.id,
                          name: item.zone.name
                        }
                      }
                    }
                  }}
                />
                <Button>
                  <Link href={`/zones/${zoneWithExtra.zone.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            )
          }}
        />
      )}
    </>
  )
} 
