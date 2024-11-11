"use client"

// Actions
import { useEffect, useState } from "react";
import { syncPaginatedRacksWithExtra } from "@/app/lib/synchronizers/extra/racks/list";
import { syncPaginatedRacksByAisleWithExtra } from "@/app/lib/synchronizers/extra/racks/listByAisle";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardRackWithExtra from "../cards/CardRackWithExtra";

// Types and interfaces
import { RackWithExtra } from "@/app/lib/types/data/racks"
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { RackFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";
import { Aisle } from "@/app/lib/types/data/aisles";

type Props = 
  | {
    type: "complete";
    filters?: RackFiltersParams;
    pagination?: PaginationParams;
    racksWithExtra: RackWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"shelfs" | "items" | "zone" | "aisle">;
    fields: {
      name: InputFieldProps;
      button: DictFormButton;
      zone: SelectFieldProps<"Zone">;
      aisle: SelectFieldProps<"Aisle">;
      rack: SelectFieldProps<"Rack">;
    };
  } | {
    type: "aisle";
    aisle: Aisle;
    filters?: RackFiltersParams;
    pagination?: PaginationParams;
    racksWithExtra: RackWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"shelfs" | "items" | "zone" | "aisle">;
    fields: {
      name: InputFieldProps;
      button: DictFormButton;
      zone: SelectFieldProps<"Zone">;
      aisle: SelectFieldProps<"Aisle">;
      rack: SelectFieldProps<"Rack">;
    };
  }

// Needs to know what kind of list it is
// and needs to communicate it to the syncher
export default function ListRacksWithExtraClient(props: Props) {
  const { type, pagination, filters, racksWithExtra, dictDialogEdit, dictDialogReplace,
  dictCard, fields} = props;

  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);
  const [currentRacks, setCurrentRacks] = useState(fields.rack.list);
  const [currentRacksWithExtra, setCurrentRacksWithExtra] = 
    useState(racksWithExtra);

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
    synchronizeList<"Rack">({
      streamer: streamer as Worker,
      list: currentRacks,
      setList: setCurrentRacks,
      type: "Rack",
    });

    if (type === "complete") {
      syncPaginatedRacksWithExtra({
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentRacksWithExtra,
        setList: setCurrentRacksWithExtra,
      });
    };

    if (type === "aisle") {
      const { aisle } = props;
      syncPaginatedRacksByAisleWithExtra({
        aisle: aisle.id as string,
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentRacksWithExtra,
        setList: setCurrentRacksWithExtra,
      });
    };
  }, [])

  return (
    <>
      {currentRacksWithExtra && currentRacksWithExtra.map(
        (item: RackWithExtra) => (
          <CardRackWithExtra
            key={item.rack.id}
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
              rack: {
                ...fields.rack,
                list: currentRacks,
              },
            }}
          />
        ))}
    </>
  )
}
