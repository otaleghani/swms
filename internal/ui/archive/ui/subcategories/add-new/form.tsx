"use client";

import { useActionState, useEffect } from "react"
import { AddSubcategoryDialogState, AddSubcategoryDialogAction } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Loader2 } from "lucide-react";

import { AddNewSubcategoryDialogProps } from "./dialog";
interface AddNewSubcategoryFormProps extends AddNewSubcategoryDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddNewSubcategoryForm({ 
  category,
  dict_subcategory_add_dialog, 
  locale,
  setOpen,
}: AddNewSubcategoryFormProps) {
  const initialState: AddSubcategoryDialogState = {
    error: false,
    errorMessages: { name: [], description: [], category: [] },
    message: "",
  }
  const [state, action, isPending] = useActionState(AddSubcategoryDialogAction, initialState);

  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false);
    }
  }, [state]);

  return (
    <form action={action} id="subcategory_dialog">
      <div>

        <div>
          <Label htmlFor="name" className="text-right">{dict_subcategory_add_dialog.fields.name.label}</Label>
          <Input
            className={`${state.errorMessages.name.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="name"
            placeholder={dict_subcategory_add_dialog.fields.name.placeholder}/>
          <FormFieldError 
            id="name-error" 
            description={state.errorMessages.name} />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">{dict_subcategory_add_dialog.fields.description.label}</Label>
          <Input
            className={`${state.errorMessages.description.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="description"
            placeholder={dict_subcategory_add_dialog.fields.description.placeholder}/>
          <FormFieldError 
            id="description-error" 
            description={state.errorMessages.description} />
        </div>

        <input type="hidden" value={locale} name="locale" />
        <input type="hidden" value={category.id} name="category" />
        <Button 
          disabled={isPending} 
          className="mt-2 w-full" 
          type="submit" 
          form="subcategory_dialog">
            {isPending ? 
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {dict_subcategory_add_dialog.pending}
            </>
            : dict_subcategory_add_dialog.button}
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
