"use client";

import { useState, useEffect, useActionState } from "react";
import { Item, Variant } from "@/app/lib/types";
import { AddVariantFieldState, AddVariantFieldAction } from "./action";

interface AddVariantsFieldProps {
  item: Item;
  locale: string;
}

export default function AddVariantsField({
  item,
  locale,
}: AddVariantsFieldProps) {
  const initialState: AddVariantFieldState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      internalId: [],
      quantity: [],
      width: [],
      height: [],
      length: [],
      weight: [],
      item: [],
    },
    message: "",
  }

  const [state, action, isPending] = useActionState(AddVariantFieldAction, initialState);
  const [variants, setVariants] = useState("");

  useEffect(() => {
    if (state.message && !state.error) {
      const variantsObj: Variant[] = JSON.parse(variants);
      variantsObj.push(state.result as Variant)
      setVariants(JSON.stringify(variantsObj))
    }
  }, [state])

  return (
    <div>
      <input type="hidden" name="variants" value={variants} />
      <form action={action}>
        <div className="py-4">
          <h3 className="font-semibold pb-2">Dimensione</h3>
          <div className="grid xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
            <WidthInput 
              dict={dict_general_fields.input.width}
              className=""
            />
            <LengthInput 
              dict={dict_general_fields.input.length}
              className=""
            />
            <HeightInput 
              dict={dict_general_fields.input.height}
              className=""
            />
            <WeightInput 
              dict={dict_general_fields.input.weight}
              className=""
            />
          </div>
        </div>
        
        <input type="hidden" name={locale} value={locale} />
      </form>
    </div>
  )
}
