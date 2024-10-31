"use client"

import { Zone, ZoneWithExtra } from "@/app/lib/types/data/zones"
import CardZoneWithExtra from "../cards/CardZoneWithExtra";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";


interface Props {
  perPage?: number;
  zonesWithExtra: ZoneWithExtra[];
  zones: Zone[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"aisles" | "items">
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
  }
}

import streamer from "@/app/lib/workers";
import { synchronizeZonesWithExtraList } from "@/app/lib/synchronizers/extra/zones";

// Client function to handle changes on list client side
export default function ListZonesWithExtraClient({
  perPage,
  zonesWithExtra,
  zones,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  fields
}: Props) {
  const [currentZones, setCurrentZones] = useState(zones);
  const [currentZonesWithExtra, setCurrentZonesWithExtra] = useState(zonesWithExtra)

  useEffect(() => {
    // Synchs ALL the zones, not only the ones that are currently available
    // Used for whenever you have lists that are NOT paginated
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentZones,
      setList: setCurrentZones,
      type:"Zone",
    });

    // I need another one to manage the pagination
    // This one 
    // HERE PERPAGE
    if (currentZonesWithExtra) {
    synchronizeZonesWithExtraList({
      streamer: streamer as Worker,
      list: currentZonesWithExtra,
      setList: setCurrentZonesWithExtra,
    });
    }
  }, [])

  return (
    <>
      {currentZonesWithExtra && currentZonesWithExtra.map((item: ZoneWithExtra) => (
        <CardZoneWithExtra
          key={item.zone.id}
          item={item}
          dictDialogEdit={dictDialogEdit}
          dictDialogReplace={dictDialogReplace}
          dictCard={dictCard}
          fields={{
            ...fields,
            zone: {
              ...fields.zone,
              list: currentZones,
            }
          }}
        />
      ))}
    </>
  )
}
