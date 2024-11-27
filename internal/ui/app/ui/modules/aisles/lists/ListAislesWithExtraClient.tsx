"use client"

// Actions
import { useEffect, useState } from "react";
import { syncPaginatedAislesWithExtra } from "@/app/lib/synchronizers/extra/aisles/list";
import { syncPaginatedAislesByZoneWithExtra } from "@/app/lib/synchronizers/extra/aisles/listByZone";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardAisleWithExtra from "../cards/CardAisleWithExtra";

// Types and interfaces
import { AisleWithExtra } from "@/app/lib/types/data/aisles"
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { AisleFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";
import { Zone } from "@/app/lib/types/data/zones";

type Props = 
  | {
    type: "complete";
    filters?: AisleFiltersParams;
    pagination?: PaginationParams;
    aislesWithExtra: AisleWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"racks" | "items" | "zone">;
    dictNotFound: string;
    fields: {
      name: InputFieldProps;
      button: DictFormButton;
      zone: SelectFieldProps<"Zone">;
      aisle: SelectFieldProps<"Aisle">;
    };
  } | {
    type: "zone";
    zone: Zone;
    filters?: AisleFiltersParams;
    pagination?: PaginationParams;
    aislesWithExtra: AisleWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"racks" | "items" | "zone">;
    dictNotFound: string;
    fields: {
      name: InputFieldProps;
      button: DictFormButton;
      zone: SelectFieldProps<"Zone">;
      aisle: SelectFieldProps<"Aisle">;
    };
  }

// Needs to know what kind of list it is
// and needs to communicate it to the syncher
export default function ListAislesWithExtraClient(props: Props) {
  const { type, pagination, filters, aislesWithExtra, dictDialogEdit, dictDialogReplace,
  dictCard, dictNotFound, fields} = props;

  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);
  const [currentAislesWithExtra, setCurrentAislesWithExtra] = 
    useState(aislesWithExtra);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentZones,
      setList: setCurrentZones,
      type: "Zone",
    });

    synchronizeList<"Aisle">({
      streamer: streamer as Worker,
      list: currentAisles,
      setList: setCurrentAisles,
      type: "Aisle",
    });

    if (type === "complete") {
      syncPaginatedAislesWithExtra({
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentAislesWithExtra,
        setList: setCurrentAislesWithExtra,
      });
    };

    if (type === "zone") {
      const { zone } = props;
      syncPaginatedAislesByZoneWithExtra({
        zone: zone.id as string,
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentAislesWithExtra,
        setList: setCurrentAislesWithExtra,
      });
    };
  }, [])

  return (
    <>
      {currentAislesWithExtra && currentAislesWithExtra.map(
        (item: AisleWithExtra) => (
          <CardAisleWithExtra
            key={item.aisle.id}
            item={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={{
              ...fields,
              zone: {
                ...fields.zone,
                list: currentZones,
              },
              aisle: {
                ...fields.aisle,
                list: currentAisles,
              },
            }}
          />
        ))}
      {!currentAislesWithExtra && <>{dictNotFound}</>}
    </>
  )
}
