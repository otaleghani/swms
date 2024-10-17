"use client";

import { useActionState } from "react"
import { EditCategoryAction, EditCategoryState } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { EditCategoryDialogProps } from "./dialog";

interface EditCategoryFormProps extends EditCategoryDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditCategoryForm({ 
  dict, 
  locale, 
  category,
  setOpen,
}: EditCategoryFormProps ) {
  const initialState: EditCategoryState = {
    error: false,
    errorMessages: { name: [], id: [], description: [], },
    message: "",
  }
  const [state, action] = useActionState(EditCategoryAction, initialState);

  return (
    <>
      <form action={action}>
        <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="name"
            defaultValue={category.name}
            placeholder={category.name}
          />
          <FormFieldError 
            id="name-error" 
            description={state.errorMessages.name} />
        </div>

        <div>
          <Label>{dict.fields.description.label}</Label>
          <Input 
            name="description"
            defaultValue={category.description}
            placeholder={category.description}
          />
          <FormFieldError 
            id="description-error" 
            description={state.errorMessages.description} />
        </div>

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={category.id} name="id" />
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
