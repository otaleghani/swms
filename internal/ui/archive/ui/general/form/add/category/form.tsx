import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Button } from "@/components/button";
import { Loader2 } from "lucide-react"
import { useActionState, useEffect, useState } from "react";
import { AddNewCategory, FormCategoryState } from "./action";
import { AddCategoryDialogProps } from "./dialog";
import { Category } from "@/app/lib/types";

interface AddCategoryFormProps extends AddCategoryDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCategoryForm({ 
  handleAddCategory, 
  locale, 
  dict_add_dialog, 
  setOpen 
}: AddCategoryFormProps ) {
  const initialState: FormCategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    }
  }
  const [state, action, isPending] 
    = useActionState(AddNewCategory, initialState)

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false)
      handleAddCategory(state.result as Category)
    }
  }, [state])

  return (
    <form action={action} id="category_dialog">
      <div className="grid gap-4 py-4">
        <input type="hidden" name="locale" value={locale} />
        <div>
          <Label htmlFor="name" className="text-right">{dict_add_dialog.fields.name.label}</Label>
          <Input
            className={`${state.errorMessages.name.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="name"
            placeholder={dict_add_dialog.fields.name.placeholder}/>
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.name} />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">{dict_add_dialog.fields.description.label}</Label>
          <Input
            className={`${state.errorMessages.description.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="description"
            placeholder={dict_add_dialog.fields.description.placeholder}
          />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.description} />
        </div>

        <Button 
          disabled={isPending} 
          className="mt-2 w-full" 
          type="submit" 
          form="category_dialog">
            {isPending ? 
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict_add_dialog.pending}</>
            : dict_add_dialog.button}
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
