"use client";

import { useActionState } from "react"
import { EditSupplierAction, EditSupplierState } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Supplier } from "@/app/lib/types";
import { EditSupplierDialogProps } from "./dialog";

interface EditSupplierFormProps extends EditSupplierDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditSupplierForm({ 
  dict, 
  locale, 
  supplier,
  setOpen,
}: EditSupplierFormProps ) {
  const initialState: EditSupplierState = {
    error: false,
    errorMessages: { name: [], id: [], description: [], },
    message: "",
  }
  const [state, action] = useActionState(EditSupplierAction, initialState);

  return (
    <>
      <form action={action}>
        <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="name"
            defaultValue={supplier.name}
            placeholder={supplier.name}
          />
          <FormFieldError 
            id="quantity-error" 
            description={state.errorMessages.name} />
        </div>

        <div>
          <Label>{dict.fields.description.label}</Label>
          <Input 
            name="name"
            defaultValue={supplier.description}
            placeholder={supplier.description}
          />
          <FormFieldError 
            id="quantity-error" 
            description={state.errorMessages.description} />
        </div>

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={supplier.id} name="id" />
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
