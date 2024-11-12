"use client"

// Actions
import { useEffect, useState } from "react";
import { syncPaginatedShelfsWithExtra } from "@/app/lib/synchronizers/extra/shelfs/list";
import { syncPaginatedShelfsByRackWithExtra } from "@/app/lib/synchronizers/extra/shelfs/listByRack";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardShelfWithExtra from "../cards/CardShelfWithExtra";

// Types and interfaces
import { ShelfWithExtra } from "@/app/lib/types/data/shelfs";
import { Rack } from "@/app/lib/types/data/racks"
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { RackFiltersParams, ShelfFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

type Props = 
  | {
    type: "complete";
    filters?: ShelfFiltersParams;
    pagination?: PaginationParams;
    shelfsWithExtra: ShelfWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"items" | "zone" | "aisle" | "rack">;
    dictNotFound: string;
    fields: {
      name: InputFieldProps;
      button: DictFormButton;
      zone: SelectFieldProps<"Zone">;
      aisle: SelectFieldProps<"Aisle">;
      rack: SelectFieldProps<"Rack">;
      shelf: SelectFieldProps<"Shelf">;
    };
  } | {
    type: "rack";
    rack: Rack;
    filters?: ShelfFiltersParams;
    pagination?: PaginationParams;
    shelfsWithExtra: ShelfWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"items" | "zone" | "aisle" | "rack">;
    dictNotFound: string;
    fields: {
      name: InputFieldProps;
      button: DictFormButton;
      zone: SelectFieldProps<"Zone">;
      aisle: SelectFieldProps<"Aisle">;
      rack: SelectFieldProps<"Rack">;
      shelf: SelectFieldProps<"Shelf">;
    };
  }

// Needs to know what kind of list it is
// and needs to communicate it to the syncher
export default function ListRacksWithExtraClient(props: Props) {
  const { type, pagination, filters, shelfsWithExtra, 
    dictDialogEdit, dictDialogReplace, dictCard, 
    dictNotFound, fields} = props;

  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentAisles, setCurrentAisles] = useState(fields.aisle.list);
  const [currentRacks, setCurrentRacks] = useState(fields.rack.list);
  const [currentShelfs, setCurrentShelfs] = useState(fields.shelf.list);
  const [currentShelfsWithExtra, setCurrentShelfsWithExtra] = 
    useState(shelfsWithExtra);

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
    synchronizeList<"Shelf">({
      streamer: streamer as Worker,
      list: currentShelfs,
      setList: setCurrentShelfs,
      type: "Shelf",
    });

    if (type === "complete") {
      syncPaginatedShelfsWithExtra({
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentShelfsWithExtra,
        setList: setCurrentShelfsWithExtra,
      });
    };

    if (type === "rack") {
      const { rack } = props;
      syncPaginatedShelfsByRackWithExtra({
        rack: rack.id as string,
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentShelfsWithExtra,
        setList: setCurrentShelfsWithExtra,
      });
    };
  }, [])

  return (
    <>
      {currentShelfsWithExtra && currentShelfsWithExtra.map(
        (item: ShelfWithExtra) => (
          <CardShelfWithExtra
            key={item.shelf.id}
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
              shelf: {
                ...fields.shelf,
                list: currentShelfs,
              },
            }}
          />
        ))}
      {!currentShelfsWithExtra && <>{dictNotFound}</>}
    </>
  )
}
