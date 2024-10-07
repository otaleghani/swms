"use client";

/** React hooks */
import { useState } from "react";

/** Local components */
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";
import SelectFieldPattern from "../select/SelectFieldPattern";
import { Client } from "@/app/lib/types/data/clients";
import SelectFieldWithAddPattern from "../select/SelectFieldWithAddPattern";

export const ProductFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Product"] ) => { 
  const [element, setElement] = useState(
    result?.client ? 
      fields.clientWithAdd.selectField.list.find(
        e => e.id === result.client) as Client : 
      { id: "", name: "" } as Client)

  return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description}
    />
    <SelectFieldWithAddPattern<"Client"> 
      selectField={fields.clientWithAdd.selectField}
      addDialog={fields.clientWithAdd.addDialog}
      element={element}
      setElement={setElement}
      errorMessages={errorMessages.clientWithAdd}
    />
    <InputPattern 
      field="images"
      dict={fields.images.dict}
      //defaultValue={result?.images}
      className=""
      label={true}
      errorMessages={errorMessages.images}
    />
  </>
)}
