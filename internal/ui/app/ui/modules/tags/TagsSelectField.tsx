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
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

export interface TagsSelectFieldsProps {
  fields: {
    category?: {
      errorMessages: string[];
      defaultValue?: Category;
      select: SelectFieldProps<"Category">;
      type?: "itemToDelete" | "itemThatReplaces";
    },
    subcategory?: {
      errorMessages: string[];
      defaultValue?: Subcategory;
      select: SelectFieldProps<"Subcategory">;
      type?: "itemToDelete" | "itemThatReplaces";
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

  // Changed from useEffect to normal variable, because we want this
  // to be updated everytime a new change is synched
  let listCategory = (
    fields.category?.select.list ? fields.category.select.list : []
  );
  let listSubcategory = (
    fields.subcategory?.select.list ? fields.subcategory.select.list : []
  );

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
            {fields.category.type && (
              <input 
                type="hidden"
                name={fields.category.type} 
                value={selectedCategory.id} 
              />
            )} 
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
            {fields.subcategory.type && (
              <input 
                type="hidden" 
                name={fields.subcategory.type} 
                value={selectedSubcategory.id} 
              />
            )} 
          </div>
        )}
      </div>
    </div>
  )
}
