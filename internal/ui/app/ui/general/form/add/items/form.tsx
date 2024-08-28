"use client";

import { useActionState } from "react";

import { AddNewItem, FormItemsAddState } from "@/app/ui/general/form/add/items/action";

import SelectCategory from "@/app/ui/general/form/select/tags/field";
import { Button } from "@/components/button";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface FormItemsAddProps {
  listCategory: any[];
  listSubcategory: any[];
  dict: any;
  dictCategory: any;
  dictSubcategory: any;
  lang: string;
}

export default function FormItemsAdd({ listCategory, listSubcategory, dict, dictCategory, dictSubcategory, lang }: FormItemsAddProps) {
  const initialState: FormItemsAddState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
      subcategory: [],
    },
  }
  const [state, action, isPending] = useActionState(AddNewItem, initialState)

  return (
    <>
      <form action={action} id="FormItemsAdd">
        <div className="mb-2">
          <Label htmlFor="name">{dict.item.form.fields.name.label}</Label>
          <Input 
            type="text"
            name="name"
            id="name"
            placeholder={dict.item.form.fields.name.placeholder}
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="description">{dict.item.form.fields.description.label}</Label>
          <Input 
            type="text"
            name="description"
            id="description"
            placeholder={dict.item.form.fields.description.placeholder}
          />
        </div>
        <div className="grid xl:gap-y-4 gap-x-4 xl:grid-cols-4 grid-cols-2">
          <div className="mb-2 w-full">
            <Label htmlFor="length">{dict.variant.form.fields.length.label}</Label>
            <Input 
              type="number"
              name="length"
              id="length"
              placeholder={dict.variant.form.fields.length.placeholder}
            />
          </div>
          <div className="mb-2 w-full">
            <Label htmlFor="width">{dict.variant.form.fields.width.label}</Label>
            <Input 
              type="number"
              name="width"
              id="width"
              placeholder={dict.variant.form.fields.width.placeholder}
            />
          </div>
          <div className="mb-2 w-full">
            <Label htmlFor="height">{dict.variant.form.fields.height.label}</Label>
            <Input 
              type="number"
              name="height"
              id="height"
              placeholder={dict.variant.form.fields.height.placeholder}
            />
          </div>
          <div className="mb-2 w-full">
            <Label htmlFor="weight">{dict.variant.form.fields.weight.label}</Label>
            <Input 
              type="number"
              name="weight"
              id="weight"
              placeholder={dict.variant.form.fields.weight.placeholder}
            />
          </div>
          
        </div>
        <div>
          <SelectCategory 
            categoryData={listCategory} 
            subcategoryData={listSubcategory}
            lang={lang} 
            dictCategory={dict.categories.form}
            dictSubcategory={dict.subcategories.form} />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.category} />
        </div>
        <Button 
          disabled={isPending} 
          className="my-2 w-full" 
          type="submit" 
          form="FormItemsAdd">
            {isPending ? 
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict.item.form.pending}</>
            : dict.item.form.button}
        </Button>
        <Button variant="secondary" className="w-full" type="reset">{dict.item.form.clear_button}</Button>
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
