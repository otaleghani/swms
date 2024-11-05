"use client";

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { synchronizePaginatedZonesWithExtra } from "@/app/lib/synchronizers/extra/zones";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardZoneWithExtra from "../cards/CardZoneWithExtra";

// Types and interfaces
import { ZoneWithExtra } from "@/app/lib/types/data/zones";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { ZoneFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

interface Props {
  filters?: ZoneFiltersParams;
  pagination?: PaginationParams;
  zonesWithExtra: ZoneWithExtra[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"aisles" | "items">;
  fields: {
    name: InputFieldProps;
    button: DictFormButton;
    zone: SelectFieldProps<"Zone">;
  };
}

// Client function to handle changes on list client side
export default function ListZonesWithExtraClient({
  pagination,
  filters,
  zonesWithExtra,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  fields,
}: Props) {
  const [currentZones, setCurrentZones] = useState(fields.zone.list);
  const [currentZonesWithExtra, setCurrentZonesWithExtra] =
    useState(zonesWithExtra);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentZones,
      setList: setCurrentZones,
      type: "Zone",
    });

    synchronizePaginatedZonesWithExtra({
      filters: filters,
      pagination: pagination,
      streamer: streamer as Worker,
      list: currentZonesWithExtra,
      setList: setCurrentZonesWithExtra,
    });
  }, []);

  return (
    <>
      {currentZonesWithExtra &&
        currentZonesWithExtra.map((item: ZoneWithExtra) => (
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
              },
            }}
          />
        ))}
    </>
  );
}
