"use client";

import { useActionState, useState } from "react"
import { DeleteSupplierState, DeleteSupplierAction } from "./action";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import SelectSupplier from "../../general/form/select/supplier/field";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { Supplier } from "@/app/lib/types";
import { DeleteSupplierDialogProps } from "./dialog";

interface DeleteSupplierFormProps extends DeleteSupplierDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteSupplierForm({ 
  dict, 
  locale, 
  item, 
  suppliers, 
  dict_supplier_select,
  setOpen 
}: DeleteSupplierFormProps) {
  const initialState: DeleteSupplierState = {
    error: false,
    errorMessages: { id: [], supplier: [] },
    message: "",
  }
  const [state, action] = useActionState(DeleteSupplierAction, initialState);
  const [supplier, setSupplier] = useState({id: "", name: "", description: ""});

  return (
    <>
      <form action={action}>
        <SelectSupplier 
          supplier={supplier}
          setSupplier={setSupplier}
          suppliers={suppliers}
          dict_supplier_select={dict_supplier_select}
        />
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.supplier} />
        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={item.id} name="id" />
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
