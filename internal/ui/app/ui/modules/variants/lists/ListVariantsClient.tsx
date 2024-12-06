"use client"

// Actions
import { useEffect, useState } from "react";

// Workers
import streamer from "@/app/lib/workers";

// Types and interfaces
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { VariantFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";
import { Variant, Variants } from "@/app/lib/types/data/variants";
import { syncPaginatedVariantsByItem } from "@/app/lib/synchronizers/extra/variants/listByItem";
import { Item } from "@/app/lib/types/data/items";
import CardVariant from "../cards/VariantCard";
import { SupplierCodes } from "@/app/lib/types/data/supplierCodes";
import { syncSupplierCodesByItem } from "@/app/lib/synchronizers/extra/supplierCodes/listByItem";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

type Props = {
  variants: Variants;
  codes: SupplierCodes;
  item: Item
  filters?: VariantFiltersParams;
  pagination?: PaginationParams;
  dictDialogEdit: DictDialog;
  dictDialogDelete: DictDialog;
  dictCard: DictLabelList<"dimensions" | "weight" | "quantity" | "identifier">;
  dictNotFound: string;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    identifier: InputFieldProps;
    length: InputFieldProps;
    width: InputFieldProps;
    height: InputFieldProps;
    weight: InputFieldProps;
    quantity: InputFieldProps;
    lengthUnit: SelectFieldProps<"Unit">;
    weightUnit: SelectFieldProps<"Unit">;
    item: SelectFieldProps<"Item">;
    button: DictFormButton;
  };
  supplierCodeCard: {
    dialogCreate: {
      fields: {
        code: InputFieldProps;
        supplier: SelectFieldProps<"Supplier">;
        item: SelectFieldProps<"Item">;
        variant: SelectFieldProps<"Variant">;
        button: DictFormButton;
      };
      dict: DictDialog,
    };
    dialogEdit: {
      fields: {
        code: InputFieldProps;
        supplier: SelectFieldProps<"Supplier">;
        item: SelectFieldProps<"Item">;
        variant: SelectFieldProps<"Variant">;
        button: DictFormButton;
      };
      dict: DictDialog,
    };
    dialogDelete: {
      fields: {
        button: DictFormButton;
      };
      dict: DictDialog,
    };

  }
}

export default function ListVariantsClient({
  variants,
  codes,
  item,
  filters,
  pagination,
  dictDialogEdit,
  dictDialogDelete,
  dictCard,
  dictNotFound,
  fields,
  supplierCodeCard,
}: Props) {

  const [currentVariants, setCurrentVariants] = useState(variants);
  const [currentCodes, setCurrentCodes] = useState(codes);
  const [currentSuppliers, setCurrentSuppliers] = useState(
    supplierCodeCard.dialogCreate.fields.supplier.list
  );

  useEffect(() => {
    syncPaginatedVariantsByItem({
      id: item.id as string,
      streamer: streamer as Worker,
      pagination: pagination,
      filters: filters,
      list: currentVariants,
      setList: setCurrentVariants
    });
    syncSupplierCodesByItem({
      id: item.id as string,
      streamer: streamer as Worker,
      list: currentCodes,
      setList: setCurrentCodes,
    })
    synchronizeList<"Supplier">({
      streamer: streamer as Worker,
      list: currentSuppliers,
      setList: setCurrentSuppliers,
      type: "Supplier"
    })
  }, [])

  return (
    <>
      {currentVariants && currentVariants.map(
        (variant: Variant) => (
          <CardVariant
            key={variant.id}
            item={item}
            variant={variant}
            codes={currentCodes.filter((code) => code.variant === variant.id)}
            dictDialogEdit={dictDialogEdit}
            dictDialogDelete={dictDialogDelete}
            dictCard={dictCard}
            fields={{ ...fields }}
            supplierCodeCard={{
              ...supplierCodeCard,
              dialogCreate: {
                ...supplierCodeCard.dialogCreate,
                fields: {
                  ...supplierCodeCard.dialogCreate.fields,
                  supplier: {
                    ...supplierCodeCard.dialogCreate.fields.supplier,
                    list: currentSuppliers
                  }
                }
              }
            }}
          />
        ))}
      {!currentVariants && <>{dictNotFound}</>}
    </>
  )
}