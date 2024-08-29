"use client";

import { useActionState, useState } from "react"
import { DeleteCategoryState, DeleteCategoryAction } from "./action";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { Category } from "@/app/lib/types";
import { DeleteCategoryDialogProps } from "./dialog";
import SelectCategory from "../../general/form/select/category/field";

interface DeleteCategoryFormProps extends DeleteCategoryDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteCategoryForm({ 
  dict, 
  locale, 
  item, 
  categories,
  dict_category_select,
  setOpen 
}: DeleteCategoryFormProps) {
  const initialState: DeleteCategoryState = {
    error: false,
    errorMessages: { id: [], category: [] },
    message: "",
  }
  const [state, action] = useActionState(DeleteCategoryAction, initialState);
  const [category, setCategory] = useState({id: "", name: "", description: ""});

  return (
    <>
      <form action={action}>
        <SelectCategory
          category={category}
          categories={categories}
          setCategory={setCategory}
          dict_category_select={dict_category_select}
        />
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.category} />
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
