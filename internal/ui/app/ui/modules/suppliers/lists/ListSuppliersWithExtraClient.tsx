"use client";

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { syncPaginatedSuppliersWithExtra } from "@/app/lib/synchronizers/extra/suppliers/list";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardSupplierWithExtra from "../cards/CardSupplierWithExtra";

// Types and interfaces
import { SupplierWithExtra } from "@/app/lib/types/data/suppliers";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { SupplierFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

interface Props {
  filters?: SupplierFiltersParams;
  pagination?: PaginationParams;
  suppliersWithExtra: SupplierWithExtra[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"codes">;
  dictNotFound: string;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    supplier: SelectFieldProps<"Supplier">;
  };
}

// Client function to handle changes on list client side
export default function ListSuppliersWithExtraClient({
  pagination,
  filters,
  suppliersWithExtra,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  dictNotFound,
  fields,
}: Props) {
  const [currentSuppliersWithExtra, setCurrentSuppliersWithExtra] =
    useState(suppliersWithExtra);

  useEffect(() => {
    syncPaginatedSuppliersWithExtra({
      filters: filters,
      pagination: pagination,
      streamer: streamer as Worker,
      list: currentSuppliersWithExtra,
      setList: setCurrentSuppliersWithExtra,
    });
  }, []);

  return (
    <>
      {currentSuppliersWithExtra &&
        currentSuppliersWithExtra.map((item: SupplierWithExtra) => (
          <CardSupplierWithExtra
            key={item.supplier.id}
            item={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={fields}
          />
        ))}
      {!currentSuppliersWithExtra && <>{dictNotFound}</>}
    </>
  );
}
