"use client";

/** React hooks */
import { useState } from "react";

/** Local components */
import InputPattern from "../input/InputPattern"

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields"
import { Supplier } from "@/app/lib/types/data/suppliers";
import SelectFieldWithAddPattern from "../select/SelectFieldWithAddPattern";
import SelectFieldPattern from "../select/SelectFieldPattern";

export const SupplierCodeFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["SupplierCode"] ) => { 
  const [element, setElement] = useState(
    result?.supplier ? 
      fields.supplier.list.find(
        e => e.id === result.supplier) as Supplier : 
      { id: "", name: "" } as Supplier)
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
      element={element}
      setElement={setElement}
      errorMessages={errorMessages.supplier}
    />
      <input type="hidden" name="type" value="SupplierCodes" />
  </>
)}
