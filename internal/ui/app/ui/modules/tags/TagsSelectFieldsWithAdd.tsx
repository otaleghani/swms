"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Category, emptyCategory } from "@/app/lib/types/data/categories";
import { Subcategory, emptySubcategory } from "@/app/lib/types/data/subcategories";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

import { filterList, addNewItemToList } from "../../patterns/form/select/action";

export interface TagsSelectFieldsWithAddProps {
  fields: {
    category?: {
      errorMessages: string[];
      defaultValue?: Category;
      select: SelectFieldProps<"Category">;
      formDialog: DialogFormPatternProps<"Category">;
    },
    subcategory?: {
      errorMessages: string[];
      defaultValue?: Subcategory;
      select: SelectFieldProps<"Subcategory">;
      formDialog: DialogFormPatternProps<"Subcategory">;
    },
  }
}

export default function TagsSelectFieldsWithAdd({
  fields
}: TagsSelectFieldsWithAddProps) {
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

  const refreshCategoryList = (item: Category) => {
    addNewItemToList(item, listCategory, setListCategory);
    setSelectedCategory(item);
  };

  const refreshSubcategoryList = (item: Subcategory) => {
    addNewItemToList(item, listSubcategory, setListSubcategory);
    setSelectedSubcategory(item);
  };

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
            <DialogFormPattern<"Category"> 
              self={fields.category.formDialog.self}
              formPattern={{
                ...fields.category.formDialog.formPattern,
                form: {
                  ...fields.category.formDialog.formPattern.form,
                  refreshItemList: refreshCategoryList,
                }
              }}
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
            <DialogFormPattern<"Subcategory"> 
              self={fields.subcategory.formDialog.self}
              formPattern={{
                ...fields.subcategory.formDialog.formPattern,
                form: {
                  ...fields.subcategory.formDialog.formPattern.form,
                  refreshItemList: refreshSubcategoryList,
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
