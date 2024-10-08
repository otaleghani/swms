
"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

/** Types and interfaces */
import { Client, emptyClient } from "@/app/lib/types/data/clients";
import { Product, emptyProduct } from "@/app/lib/types/data/products";

import { SelectFieldProps } from "@/app/lib/types/form/fields";
import { filterList } from "../../patterns/form/select/action";

export interface ProductsByClientSelectFieldsProps {
  fields: {
    client?: {
      errorMessages: string[];
      defaultValue?: Client;
      select: SelectFieldProps<"Client">;
    },
    product?: {
      errorMessages: string[];
      defaultValue?: Product;
      select: SelectFieldProps<"Product">;
    },
  }
}

export default function ProductsByClientSelectFields({
  fields
}: ProductsByClientSelectFieldsProps) {
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
