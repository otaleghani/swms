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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/button";
import { CirclePlusIcon } from "lucide-react";

interface AddVariantsFieldProps {
  locale: string;

  dict_general_fields: any;
  dict_variant_add_form: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;

  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantsField({
  locale,

  dict_general_fields,
  dict_variant_add_form,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,

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
  const [codes, setCodes] = useState([] as SupplierCode[]);

  useEffect(() => {
    console.log(state)
    if (state.error !== true && state.result !== undefined) {
      const variants_new: Variant[] = variants;
      variants_new.push(state.result.variant as Variant);
      setVariants(variants_new);
      setVariantsJSON(JSON.stringify(variants_new));

      // const codes_new: SupplierCode[] = codes;
      // codes_new.push(...state.result.codes);
      // setCodes(codes_new)
      // setSupplierCodesJSON(JSON.stringify(codes_new))
    }
  }, [state])

  return (
    <form action={action} id={formName}> 
      <div className="pb-4 bg-white p-4 rounded"> 
        <h3 className="font-semibold pb-2"> 
          {dict_variant_add_form.table.title} 
        </h3>
        <div className="">
          <VariantsTable 
            variants={variants}
            dict={dict_variant_add_form.table}
            dict_variant_delete_dialog={dict_variant_delete_dialog}
            dict_variant_edit_dialog={dict_variant_edit_dialog}
          />
        </div>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button variant="outline" asChild>
            <span><CirclePlusIcon className="h-[1.2rem] w-[1.2rem] mr-2"/>Apri</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-gray-100 w-[100%] p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="text-left">
              {dict_variant_add_form.header.title}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea
            className="h-[calc(100dvh_-_57px)] overflow-auto p-4"
            type="always"
          >
            <div className="grid gap-2 p-5 bg-white rounded my-2">
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
            <div className="grid xl:grid-cols-2 gap-2 p-5 bg-white rounded my-2">
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

            <div className="grid xl:grid-cols-4 gap-2 p-5 bg-white rounded my-2">
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

            <div className="grid gap-2 p-5 bg-white rounded">
              <SubmitButton 
                dict={dict_general_fields.buttons.add}
                isPending={isPending}
                className="pt-4"
                form={formName}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>


      <input type="hidden" name="locale" value={locale} />
    </form>
  )
}
