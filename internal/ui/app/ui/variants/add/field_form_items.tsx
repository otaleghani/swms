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
import QuantityInput from "../../general/form/input/quantity";

interface AddVariantsFieldProps {
  locale: string;
  dict_general_fields: any;
  dict_variant_add_form: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
  variantsJSON: string;
  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantsField({
  dict_variant_add_form,
  locale,
  dict_general_fields,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,
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
  const [variants, setVariants] = useState([] as Variant[]);

  useEffect(() => {
    if (state.message && !state.error) {
      const variants_new: Variant[] = variants;
      variants_new.push(state.result as Variant);
      setVariants(variants_new);
      setVariantsJSON(JSON.stringify(variants_new));
    }
  }, [state])

  return (
    <div>
      <form action={action} id={formName} >
        <div className="pb-4">
          <h3 className="font-semibold pb-2">
            {dict_variant_add_form.table.title}
          </h3>
          <div className="p-4 bg-gray-50 rounded">
            <VariantsTable 
              variants={variants}
              dict={dict_variant_add_form.table}
              dict_variant_delete_dialog={dict_variant_delete_dialog}
              dict_variant_edit_dialog={dict_variant_edit_dialog}
            />
          </div>
        </div>

        <div className="">
          <h3 className="font-semibold pb-2">
            {dict_variant_add_form.header.title}
          </h3>
          <div className="grid gap-2 p-5 bg-gray-50 rounded">
            <NameInput 
              dict={dict_general_fields.fields.name}
              className=""
            />
            <DescriptionInput 
              dict={dict_general_fields.fields.description}
              className=""
            />
          </div>
          <div className="grid xl:grid-cols-2 gap-2 p-5 bg-gray-50 rounded">
            <IdentifierInput 
              dict={dict_general_fields.fields.identifier}
              className=""
            />
            <QuantityInput
              dict={dict_general_fields.fields.quantity}
              className=""
            />
          </div>

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
            <SubmitButton 
              dict={dict_general_fields.buttons.add}
              isPending={isPending}
              className="pt-4"
              form={formName}
            />
          </div>
        </div>

        <input type="hidden" name="locale" value={locale} />

      </form>
    </div>
  )
}
