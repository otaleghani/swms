"use client";

import { useActionState } from "react"
import { EditSupplierCodeAction, EditSupplierCodeState } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Supplier, Item, Variant } from "@/app/lib/types";
import { EditSupplierCodeDialogProps } from "./dialog";

interface EditSupplierCodeFormProps extends EditSupplierCodeDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditSupplierCodeForm({ 
  dict, 
  locale, 
  supplierCode,
  setOpen,
}: EditSupplierCodeFormProps ) {
  const initialState: EditSupplierCodeState = {
    error: false,
    errorMessages: { 
      id: [], 
      code: [], 
      supplier: [], 
      item: [], 
      variant: [], 
    },
    message: "",
  }
  const [state, action] = useActionState(EditSupplierCodeAction, initialState);

  return (
    <>
      <form action={action}>
        <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="code"
            defaultValue={supplierCode.code}
            placeholder={supplierCode.code}
          />
          <FormFieldError 
            id="quantity-error" 
            description={state.errorMessages.code} />
        </div>

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={supplierCode.id} name="id" />
        <Input type="hidden" value={supplierCode.supplier} name="supplier" />
        <Input type="hidden" value={supplierCode.item} name="item" />
        <Input type="hidden" value={supplierCode.variant} name="variant" />
        <Button type="submit" className="w-full mt-2">{dict.button}</Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </form>
    </>
  )
}
