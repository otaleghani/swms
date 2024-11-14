"use client";

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { syncPaginatedSupplierCodesWithExtra } from "@/app/lib/synchronizers/extra/supplierCodes/list";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardSupplierCodeWithExtra from "../cards/CardSupplierCodeWithExtra";

// Types and interfaces
import { SupplierCodeWithExtra } from "@/app/lib/types/data/supplierCodes";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { SupplierCodeFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

interface Props {
  filters?: SupplierCodeFiltersParams;
  pagination?: PaginationParams;
  supplierCodesWithExtra: SupplierCodeWithExtra[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"codes">;
  dictNotFound: string;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    supplierCode: SelectFieldProps<"SupplierCode">;
  };
}

// Client function to handle changes on list client side
export default function ListSupplierCodesWithExtraClient({
  pagination,
  filters,
  supplierCodesWithExtra,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  dictNotFound,
  fields,
}: Props) {
  const [currentSupplierCodesWithExtra, setCurrentSupplierCodesWithExtra] =
    useState(supplierCodesWithExtra);

  useEffect(() => {
    syncPaginatedSupplierCodesWithExtra({
      filters: filters,
      pagination: pagination,
      streamer: streamer as Worker,
      list: currentSupplierCodesWithExtra,
      setList: setCurrentSupplierCodesWithExtra,
    });
  }, []);

  return (
    <>
      {currentSupplierCodesWithExtra &&
        currentSupplierCodesWithExtra.map((item: SupplierCodeWithExtra) => (
          <CardSupplierCodeWithExtra
            key={item.supplierCode.id}
            item={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={fields}
          />
        ))}
      {!currentSupplierCodesWithExtra && <>{dictNotFound}</>}
    </>
  );
}
