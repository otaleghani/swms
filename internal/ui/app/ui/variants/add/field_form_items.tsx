"use client";

import { useState, useEffect, useActionState } from "react";

import { Variant } from "@/app/lib/types";
import { AddVariantFieldState, AddVariantFieldAction } from "./action";

/** Components */
import WidthInput from "../../general/form/input/width";
import HeightInput from "../../general/form/input/heigth";
import WeightInput from "../../general/form/input/weight";
import LengthInput from "../../general/form/input/length";
import NameInput from "../../general/form/input/name";
import DescriptionInput from "../../general/form/input/description";
import IdentifierInput from "../../general/form/input/identifier";
import SubmitButton from "../../general/form/button/submit";
import VariantsTable from "../table/component";

interface AddVariantsFieldProps {
  locale: string;
  dict_general_fields: any;
  dict_add_variant: any;
  variantsJSON: string;
  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantsField({
  dict_add_variant,
  locale,
  dict_general_fields,
  variantsJSON,
  setVariantsJSON,
}: AddVariantsFieldProps) {
  const initialState: AddVariantFieldState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      identifier: [],
      quantity: [],
      width: [],
      height: [],
      length: [],
      weight: [],
      item: [],
    },
    message: "",
  }

  const formName = "variants";
  const [state, action, isPending] = useActionState(AddVariantFieldAction, initialState);
  const [variants, setVariants] = useState([{}] as Variant[]);

  useEffect(() => {
    if (state.message && !state.error) {
      const variants: Variant[] = JSON.parse(variantsJSON);
      variants.push(state.result as Variant);
      setVariants(variants);
      setVariantsJSON(JSON.stringify(variants));
    }
  }, [state])

  return (
    <div>
      <form action={action} id={formName} >
        <div className="">
          <h3 className="font-semibold pb-2">Variante</h3>
          <div className="grid gap-2 p-5 bg-gray-50 rounded">
            <NameInput 
              dict={dict_general_fields.fields.name}
              className=""
            />
            <DescriptionInput 
              dict={dict_general_fields.fields.description}
              className=""
            />
            <IdentifierInput 
              dict={dict_general_fields.fields.identifier}
              className=""
            />
          </div>
        </div>
        <div className="py-4">
          <h3 className="font-semibold pb-2">Dimensione</h3>
          <div className="grid xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
            <WidthInput 
              dict={dict_general_fields.fields.width}
              className=""
            />
            <LengthInput 
              dict={dict_general_fields.fields.length}
              className=""
            />
            <HeightInput 
              dict={dict_general_fields.fields.height}
              className=""
            />
            <WeightInput 
              dict={dict_general_fields.fields.weight}
              className=""
            />
          </div>
        </div>

        <input type="hidden" name="locale" value={locale} />

        <SubmitButton 
          dict={dict_general_fields.buttons.add}
          isPending={isPending}
          className=""
          form={formName}
        />
      </form>
      <div>
        <VariantsTable />
      </div>
    </div>
  )
}
