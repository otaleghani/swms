"use client"

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { synchronizePaginatedAislesWithExtra } from "@/app/lib/synchronizers/extra/aisles";

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


interface Props {
  filters?: AisleFiltersParams;
  pagination?: PaginationParams;
  aislesWithExtra: AisleWithExtra[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"racks" | "items" | "zone">;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
    aisle: SelectFieldProps<"Aisle">;
  };
};

export default function ListAislesWithExtraClient({
  pagination,
  filters,
  aislesWithExtra,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  fields
}: Props) {
  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);
  const [currentAislesWithExtra, setCurrentAislesWithExtra] = 
    useState(aislesWithExtra);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentZones,
      setList: setCurrentZones,
      type:"Zone",
    });
    synchronizeList<"Aisle">({
      streamer: streamer as Worker,
      list: currentAisles,
      setList: setCurrentAisles,
      type:"Aisle",
    });

    synchronizePaginatedAislesWithExtra({
      filters: filters,
      pagination: pagination,
      streamer: streamer as Worker,
      list: currentAislesWithExtra,
      setList: setCurrentAislesWithExtra,
    });
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
              }
            }}
          />
        ))}
    </>
  )
}
