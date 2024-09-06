import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import { useActionState, useEffect, useState } from "react";
import { AddSupplierAction, FormSupplierState } from "./action";
import { AddSupplierDialogProps } from "./dialog";
import { Supplier } from "@/app/lib/types";
import NameInput from "../../input/name";
import DescriptionInput from "../../input/description";
import SubmitButton from "../../button/submit";

interface AddSupplierFormProps extends AddSupplierDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddSupplierForm({ 
  handleAddSupplier, 
  locale, 
  dict_form_fields,
  setOpen 
}: AddSupplierFormProps ) {
  const initialState: FormSupplierState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    }
  }
  const [state, action, isPending] 
  = useActionState(AddSupplierAction, initialState);

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false)
      handleAddSupplier(state.result as Supplier)
    }
  }, [state])

  const formName = "supplier_dialog";

  return (
    <form action={action} id={formName} >
      <div className="grid gap-4 py-4">
        <input type="hidden" name="locale" value={locale} />
        <div>
          <NameInput
            dict={dict_form_fields.fields.name}
            error_messages={state.errorMessages.name}
            className=""
          />
        </div>

        <div>
          <DescriptionInput
            dict={dict_form_fields.fields.description}
            error_messages={state.errorMessages.description}
            className=""
          />
        </div>
        <SubmitButton
          isPending={false}
          dict={dict_form_fields.buttons.submit}
          className="pt-2"
          form={formName}
        />

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
