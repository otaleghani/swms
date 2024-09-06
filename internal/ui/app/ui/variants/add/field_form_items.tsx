"use client";

import { useState, useEffect, useActionState } from "react";

import { Variant, Supplier, SupplierCode } from "@/app/lib/types";
import { AddVariantFieldState, AddVariantFieldAction } from "./action";

/** Components */
import WidthInput from "../../general/form/input/width";
import HeightInput from "../../general/form/input/height";
import WeightInput from "../../general/form/input/weight";
import LengthInput from "../../general/form/input/length";
import NameInput from "../../general/form/input/name";
import DescriptionInput from "../../general/form/input/description";
import IdentifierInput from "../../general/form/input/identifier";
import SubmitButton from "../../general/form/button/submit";
import VariantsTable from "../table/component";
import QuantityInput from "../../general/form/input/quantity";
import SelectSupplier from "../../general/form/select/supplier/field";

interface AddVariantsFieldProps {
  locale: string;
  dict_general_fields: any;
  dict_variant_add_form: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
  variantsJSON: string;
  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
  supplierCodesJSON: string;
  setSupplierCodesJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantsField({
  dict_variant_add_form,
  locale,
  dict_general_fields,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,
  variantsJSON,
  setVariantsJSON,
  supplierCodesJSON,
  setSupplierCodesJSON,
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
  const [codes, setCodes] = useState([] as SupplierCode[]);

  useEffect(() => {
    console.log(state)
    if (state.error !== true && state.result !== undefined) {
      const variants_new: Variant[] = variants;
      variants_new.push(state.result.variant as Variant);
      setVariants(variants_new);
      setVariantsJSON(JSON.stringify(variants_new));

      const codes_new: SupplierCode[] = codes;
      codes_new.push(...state.result.codes);
      setCodes(codes_new)
      setSupplierCodesJSON(JSON.stringify(codes_new))
    }
  }, [state])

  return (
    <div>
      <form action={action} id={formName} >
        <div className="pb-4">
          <h3 className="font-semibold pb-2">
            {dict_variant_add_form.table.title}
          </h3>
          <div className="bg-gray-50 p-4 rounded">
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
              error_messages={state.errorMessages.name}
            />
            <DescriptionInput 
              dict={dict_general_fields.fields.description}
              className=""
              error_messages={state.errorMessages.description}
            />
          </div>
          <div className="grid xl:grid-cols-2 gap-2 p-5 bg-gray-50 rounded">
            <IdentifierInput 
              dict={dict_general_fields.fields.identifier}
              className=""
              error_messages={state.errorMessages.identifier}
            />
            <QuantityInput
              dict={dict_general_fields.fields.quantity}
              className=""
              error_messages={state.errorMessages.quantity}
            />
          </div>

          <div className="grid xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
            <WidthInput 
              dict={dict_general_fields.fields.width}
              className=""
              error_messages={state.errorMessages.width}
            />
            <LengthInput 
              dict={dict_general_fields.fields.length}
              className=""
              error_messages={state.errorMessages.length}
            />
            <HeightInput 
              dict={dict_general_fields.fields.height}
              className=""
              error_messages={state.errorMessages.height}
            />
            <WeightInput 
              dict={dict_general_fields.fields.weight}
              className=""
              error_messages={state.errorMessages.weight}
            />
          </div>

          <div className="grid gap-2 p-5 bg-gray-50 rounded">
          {/* 
            Here supplier logic 

            table field -> Shows codes, gives you edit and delete capabilities

            form add new
              add new supplier
              add new code field


            dialog add new
            dialog edit
            dialog delete
          */}
            

          </div>

          <div className="grid gap-2 p-5 bg-gray-50 rounded">
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
