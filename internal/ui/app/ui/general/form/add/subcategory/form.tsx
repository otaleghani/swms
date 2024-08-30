import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Loader2, PlusCircleIcon } from "lucide-react"
import { useActionState, useEffect, useState } from "react";
import { AddNewSubcategory, FormSubcategoryState } from "./action";
import { AddSubcategoryDialogProps } from "./dialog";
import { Category, Subcategory } from "@/app/lib/types";

interface AddSubcategoryFormProps extends AddSubcategoryDialogProps {
  setOpen: any;
}

export default function AddSubcategoryForm({ 
  handleAddSubcategory, 
  locale, 
  dict_add_dialog, 
  setOpen, 
  category 
}: AddSubcategoryFormProps) {
  const initialState: FormSubcategoryState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
    }
  }

  const [state, action, isPending] = useActionState(AddNewSubcategory, initialState)

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false);
      handleAddSubcategory(state.result as Subcategory);
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
        <div>
          <Label htmlFor="category" className="text-right">{dict_add_dialog.fields.category.label}</Label>
          <input type="hidden" value={category.id} name="category" />
          <Input
            className={`${state.errorMessages.category.length != 0 
            ? "border-red-500" 
            : ""}`}
            disabled
            defaultValue={category.name}
            placeholder="sandro"
          />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.category} />
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
