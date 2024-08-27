"use client";

import { useActionState, useEffect } from "react"
import { 
  AddSupplierCodeDialogState, 
  AddSupplierCodeDialogAction } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Loader2 } from "lucide-react";

import { AddNewSupplierCodeDialogProps } from "./dialog";
interface AddNewSupplierCodeFormProps extends AddNewSupplierCodeDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddNewSupplierCodeForm({ 
  supplier,
  item,
  variant,
  dict_supplier_code_add_dialog, 
  locale,
  setOpen,
}: AddNewSupplierCodeFormProps) {
  const initialState: AddSupplierCodeDialogState = {
    error: false,
    errorMessages: { 
      code: [], 
      supplier: [],
      item: [],
      variant: [],
    },
    message: "",
  }
  const [state, action, isPending] = useActionState(
  AddSupplierCodeDialogAction, initialState);

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false);
    }
  }, [state]);

  return (
    <form action={action} id="supplier_dialog">
      <div>
        <div>
          <Label htmlFor="name" className="text-right">{dict_supplier_code_add_dialog.fields.code.label}</Label>
          <Input
            className={`${state.errorMessages.code.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="code"
            placeholder={dict_supplier_code_add_dialog.fields.code.placeholder}/>
          <FormFieldError 
            id="code-error" 
            description={state.errorMessages.code} />
        </div>

        <input type="hidden" value={locale} name="locale" />
        <input type="hidden" value={supplier.id} name="supplier" />
        <input type="hidden" value={variant.id} name="variant" />
        <input type="hidden" value={item.id} name="item" />
        <Button 
          disabled={isPending} 
          className="mt-2 w-full" 
          type="submit" 
          form="supplier_dialog">
            {isPending ? 
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict_supplier_code_add_dialog.pending}</>
            : dict_supplier_code_add_dialog.button}
        </Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </div>
    </form>
  )
}
