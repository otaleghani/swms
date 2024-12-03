"use client"

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardSupplierCode from "../cards/CardSupplierCode";


// Types and interfaces
import { SupplierCode } from "@/app/lib/types/data/supplierCodes"
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { SupplierCodeFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";
import { Supplier } from "@/app/lib/types/data/suppliers";
import { syncPaginatedSupplierCodesBySupplier } from "@/app/lib/synchronizers/extra/supplierCodes/listBySupplier";

type Props = 
  | {
    type: "complete";
    filters?: SupplierCodeFiltersParams;
    pagination?: PaginationParams;
    supplierCodes: SupplierCode[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"item" | "variant" | "supplier">;
    dictNotFound: string;
    fields: {
      code: InputFieldProps;
      supplier: SelectFieldProps<"Supplier">;
      item: SelectFieldProps<"Item">;
      variant: SelectFieldProps<"Variant">;
      button: DictFormButton;
    };
  } | {
    type: "supplier";
    supplier: Supplier;
    filters?: SupplierCodeFiltersParams;
    pagination?: PaginationParams;
    supplierCodes: SupplierCode[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"item" | "variant" | "supplier">;
    dictNotFound: string;
    fields: {
      code: InputFieldProps;
      supplier: SelectFieldProps<"Supplier">;
      item: SelectFieldProps<"Item">;
      variant: SelectFieldProps<"Variant">;
      button: DictFormButton;
    };
  }

export default function ListSupplierCodesClient(props: Props) {
  const { type, pagination, filters, supplierCodes, dictDialogEdit, dictDialogReplace,
  dictCard, dictNotFound, fields} = props;

  const [currentSuppliers, setCurrentSuppliers] = useState(fields.supplier.list);
  const [currentItems, setCurrentItems] = useState(fields.item.list);
  const [currentVariants, setCurrentVariants] = useState(fields.variant.list);
  const [currentCodes, setCurrentCodes] = useState(supplierCodes);

  useEffect(() => {
    synchronizeList<"Supplier">({
      streamer: streamer as Worker,
      list: currentSuppliers,
      setList: setCurrentSuppliers,
      type: "Supplier",
    });
    synchronizeList<"Item">({
      streamer: streamer as Worker,
      list: currentItems,
      setList: setCurrentItems,
      type: "Item",
    });
    synchronizeList<"Variant">({
      streamer: streamer as Worker,
      list: currentVariants,
      setList: setCurrentVariants,
      type: "Variant",
    });

    if (type === "complete") {
      //synchronizeList<"SupplierCode">({
      //  streamer: streamer as Worker,
      //  list: currentCodes,
      //  setList: setCurrentCodes,
      //  type: "SupplierCode",
      //});
    };

    if (type === "supplier") {
      const { supplier } = props;
      syncPaginatedSupplierCodesBySupplier({
        supplier: supplier.id as string,
        streamer: streamer as Worker,
        list: currentCodes,
        setList: setCurrentCodes,
      })
    };
  }, [])

  return (
    <>
      {currentCodes && currentCodes.map(
        (item: SupplierCode) => (
          <CardSupplierCode
            key={item.id}
            element={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={{
              ...fields,
              supplier: {
                ...fields.supplier,
                list: currentSuppliers,
              },
              item: {
                ...fields.item,
                list: currentItems,
              },
              variant: {
                ...fields.variant,
                list: currentVariants,
              },
            }}
          />
        ))}
      {(!currentCodes || currentCodes.length === 0) && <>{dictNotFound}</>}
    </>
  )
}
