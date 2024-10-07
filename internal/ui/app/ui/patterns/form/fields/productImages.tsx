"use client";
import InputPattern from "../input/InputPattern"
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields"
import SelectFieldPattern from "../select/SelectFieldPattern"
import { useState } from "react";
import { Product } from "@/app/lib/types/data/products";

export const ProductImagesFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["ProductImage"] ) => { 
  const [element, setElement] = useState(
    result?.product ? 
      fields.product.list.find(e => e.id === result.product) as Product : 
      { id: "", name: "" } as Product
  )

  return (
    <>
      <SelectFieldPattern<"Product"> 
        name="Product"
        list={fields.product.list}
        dict={fields.product.dict}
        element={element}
        setElement={setElement}
        errorMessages={errorMessages.product as string[]}
      />
      <InputPattern 
        field="images"
        dict={fields.images.dict}
        //defaultValue={result?.images}
        className=""
        label={true}
        errorMessages={errorMessages.images as string[]}
      />
    </>
  )
}
