"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import InputPattern from "../input/InputPattern"

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields"
import { Supplier } from "@/app/lib/types/data/suppliers";
import SelectFieldWithAddPattern from "../select/SelectFieldWithAddPattern";
import SelectFieldPattern from "../select/SelectFieldPattern";
import { Item } from "@/app/lib/types/data/items";
import { Variant } from "@/app/lib/types/data/variants";

export const SupplierCodeFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["SupplierCode"] ) => { 

  const [supplier, setSupplier] = useState(
    result?.supplier ? 
      fields.supplier.list.find(
        e => e.id === result.supplier) as Supplier : 
      { id: "", name: "" } as Supplier)

  const [item, setItem] = useState(
    result?.item ? 
      fields.item.list.find(
        e => e.id === result.item) as Item : 
      { id: "", name: "" } as Item)

  const [variant, setVariant] = useState(
    result?.variant ? 
      fields.variant.list.find(
        e => e.id === result.variant) as Variant : 
      { id: "", name: "" } as Variant)

  const [filteredVariants, setFilteredVariants] = useState(
    result?.item ?
      fields.variant.list.filter(variant => variant.item === result.item) : 
      fields.variant.list
  );

  useEffect(() => {
    if (variant.item !== item.id) {
      setVariant({id: "", name: ""} as Variant);
      setFilteredVariants(fields.variant.list.filter(variant => variant.item === item.id));
    }
  }, [item])

  return (
  <>
    <InputPattern 
      field="code"
      dict={fields.code.dict}
      defaultValue={result?.code}
      className=""
      label={true}
      errorMessages={errorMessages.code as string[]}
    />
    <SelectFieldPattern<"Supplier"> 
      name="Supplier"
      list={fields.supplier.list}
      dict={fields.supplier.dict}
      element={supplier}
      setElement={setSupplier}
      errorMessages={errorMessages.supplier}
    />
    <SelectFieldPattern<"Item"> 
      name="Item"
      list={fields.item.list}
      dict={fields.item.dict}
      element={item}
      setElement={setItem}
      errorMessages={errorMessages.item}
    />

    {item.id !== "" && (
      <SelectFieldPattern<"Variant"> 
        name="Variant"
        list={filteredVariants}
        dict={fields.variant.dict}
        element={variant}
        setElement={setVariant}
        errorMessages={errorMessages.variant}
      />
    )}
    <input type="hidden" name="type" value="SupplierCode" />
  </>
)}
