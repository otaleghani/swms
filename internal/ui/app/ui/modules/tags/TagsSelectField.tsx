"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Category, emptyCategory } from "@/app/lib/types/data/categories";
import { emptySubcategory } from "@/app/lib/types/data/subcategories";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

import { filterList } from "../../patterns/form/select/action";
import { Subcategory } from "@/app/lib/types/data/subcategories";

export interface TagsSelectFieldsProps {
  fields: {
    category?: {
      errorMessages: string[];
      defaultValue?: Category;
      select: SelectFieldProps<"Category">;
    },
    subcategory?: {
      errorMessages: string[];
      defaultValue?: Subcategory;
      select: SelectFieldProps<"Subcategory">;
    },
  }
}

export default function TagsSelectFields({
  fields
}: TagsSelectFieldsProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    fields.category?.defaultValue ? 
      fields.category.defaultValue :
      emptyCategory
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    fields.subcategory?.defaultValue ? 
      fields.subcategory.defaultValue :
    emptySubcategory
  );

  const [listCategory, setListCategory] = useState(fields.category?.select.list);
  const [listSubcategory, setListSubcategory] = useState(fields.subcategory?.select.list);

  const [filteredSubcategory, setFilteredSubcategory] = useState(fields.subcategory?.select.list);

  useEffect(() => {
    if (listSubcategory) {
      if (selectedSubcategory.category !== selectedCategory.id) {
        setSelectedSubcategory(emptySubcategory);
        filterList(listSubcategory, "category", selectedCategory.id, setFilteredSubcategory);
      }
    }
  }, [selectedCategory])

  return (
    <div>
      <div>
        {fields.category && listCategory && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Category"> 
              name="Category"
              element={selectedCategory}
              setElement={setSelectedCategory}
              list={listCategory}
              errorMessages={fields.category.errorMessages}
              dict={fields.category.select.dict}
            />
          </div>
        )}
        {fields.subcategory && filteredSubcategory && (selectedCategory != emptyCategory) && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Subcategory"> 
              name="Subcategory"
              element={selectedSubcategory}
              setElement={setSelectedSubcategory}
              list={filteredSubcategory}
              errorMessages={fields.subcategory.errorMessages}
              dict={fields.subcategory.select.dict}
            />
          </div>
        )}
      </div>
    </div>
  )
}
