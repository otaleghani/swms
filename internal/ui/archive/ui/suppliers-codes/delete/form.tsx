"use client";

import { useActionState } from "react"
import { DeleteSupplierCodeState, DeleteSupplierCodeAction } from "./action";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { DeleteSupplierCodeDialogProps } from "./dialog";

interface DeleteSupplierCodeFormProps extends DeleteSupplierCodeDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteSupplierCodeForm({ 
  item,
  dict, 
  locale, 
  setOpen 
}: DeleteSupplierCodeFormProps) {
  const initialState: DeleteSupplierCodeState = {
    error: false,
    errorMessages: { id: [] },
    message: "",
  }
  const [state, action] = useActionState(
    DeleteSupplierCodeAction, initialState);

  return (
    <>
      <form action={action}>
        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={item.id} name="id" />
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.id} />
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
