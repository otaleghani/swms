"use client";

import { useActionState, useState } from "react"
import { EditSubcategoryAction, EditSubcategoryState } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";

import { EditSubcategoryDialogProps } from "./dialog";
import SelectCategory from "../../general/form/select/category/field";

interface EditSubcategoryFormProps extends EditSubcategoryDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditSubcategoryForm({ 
  dict, 
  locale, 
  subcategory,
  categories,
  dict_category_select,
  setOpen,
}: EditSubcategoryFormProps ) {
  const initialState: EditSubcategoryState = {
    error: false,
    errorMessages: { name: [], id: [], description: [], category: [] },
    message: "",
  }
  const [state, action] = useActionState(EditSubcategoryAction, initialState);

  const [category, setCategory] = useState({
    id: "",
    name: "",
    description: "",
  })

  return (
    <>
      <form action={action}>
        <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="name"
            defaultValue={subcategory.name}
            placeholder={subcategory.name}
          />
          <FormFieldError 
            id="name-error" 
            description={state.errorMessages.name} />
        </div>

        <div>
          <Label>{dict.fields.description.label}</Label>
          <Input 
            name="description"
            defaultValue={subcategory.description}
            placeholder={subcategory.description}
          />
          <FormFieldError 
            id="description-error" 
            description={state.errorMessages.description} />
        </div>

        <SelectCategory
          category={category}
          categories={categories}
          setCategory={setCategory}
          dict_category_select={dict_category_select} />

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={subcategory.id} name="id" />
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
