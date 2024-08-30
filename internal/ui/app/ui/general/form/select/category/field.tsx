"use client";

import { Label } from "@/components/label";
import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Category } from "@/app/lib/types";

interface SelectCategoryProps {
  categories: Category[];
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  dict_category_select: any;
}

export default function SelectCategory({
  categories,
  category,
  setCategory,
  dict_category_select, 
}: SelectCategoryProps) {

  return (
    <>
      <div className="w-full">
        <input 
          required
          type="hidden" 
          id="category" 
          name="category" 
          value={category.id} />
        <Label>{dict_category_select.name}</Label>
        <ComboboxSelect 
          list={categories}
          element={category} 
          setElement={setCategory}
          dict={dict_category_select.combobox} />
      </div>
    </>
  )
}
