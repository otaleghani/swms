"use client";

import { useActionState, useState } from "react"
import { DeleteSubcategoryState, DeleteSubcategoryAction } from "./action";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { DeleteSubcategoryDialogProps } from "./dialog";
import SelectSubcategory from "../../general/form/select/subcategory/field";

interface DeleteSubcategoryFormProps extends DeleteSubcategoryDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteSubcategoryForm({ 
  dict, 
  locale, 
  item, 
  subcategories,
  dict_subcategory_select,
  setOpen 
}: DeleteSubcategoryFormProps) {
  const initialState: DeleteSubcategoryState = {
    error: false,
    errorMessages: { id: [], subcategory: [] },
    message: "",
  }
  const [state, action] = useActionState(DeleteSubcategoryAction, initialState);
  const [subcategory, setSubcategory] = useState({
    id: "", 
    name: "", 
    description: "",
    category: ""
  });

  return (
    <>
      <form action={action}>
        <SelectSubcategory
          subcategory={subcategory}
          subcategories={subcategories}
          setSubcategory={setSubcategory}
          dict_subcategory_select={dict_subcategory_select}
        />
        <FormFieldError 
          id="quantity-error" 
          description={state.errorMessages.subcategory} />
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
