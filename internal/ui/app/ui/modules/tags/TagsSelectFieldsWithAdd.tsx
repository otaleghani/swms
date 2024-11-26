"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Category, emptyCategory } from "@/app/lib/types/data/categories";
import { Subcategory, defaultSubcategoryFormState, emptySubcategory } from "@/app/lib/types/data/subcategories";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

import { filterList } from "../../patterns/form/select/action";
import streamer from "@/app/lib/workers";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

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

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openSubcategoryDialog, setOpenSubcategoryDialog] = useState(false);

  const [listCategory, setListCategory] = useState(fields.category?.select.list);
  const [listSubcategory, setListSubcategory] = useState(fields.subcategory?.select.list);

  const [filteredSubcategory, setFilteredSubcategory] = useState(fields.subcategory?.select.list);

  useEffect(() => {
    if (listCategory) {
      synchronizeList<"Category">({
        streamer: streamer as Worker,
        list: listCategory,
        setList: setListCategory as React.Dispatch<React.SetStateAction<Category[]>>,
        type: "Category",
        setSelected: setSelectedCategory,
      });
    }
    if (listSubcategory) {
      synchronizeList<"Subcategory">({
        streamer: streamer as Worker,
        list: listSubcategory,
        setList: setListSubcategory as React.Dispatch<React.SetStateAction<Subcategory[]>>,
        type: "Subcategory",
        setSelected: setSelectedSubcategory,
      });
    }
  }, [])

  useEffect(() => {
    if (listSubcategory) {
      if (selectedSubcategory.category !== selectedCategory.id) {
        setSelectedSubcategory(emptySubcategory);
        filterList(listSubcategory, "category", selectedCategory.id, setFilteredSubcategory);
      }
    }
    if (selectedCategory.name == "") { setSelectedCategory(emptyCategory); }
    setOpenCategoryDialog(false);
  }, [selectedCategory]);

  useEffect(() => {
    setOpenSubcategoryDialog(false);
  }, [selectedSubcategory])

  useEffect(() => {
    filterList(listSubcategory, "category", selectedCategory.id, setFilteredSubcategory);
  }, [listSubcategory])

  return (
    <div>
      <div>
        {fields.category && listCategory && (
          <div className="flex gap-2 items-end">
            <SelectFieldPattern<"Category"> 
              name="Category"
              element={selectedCategory}
              setElement={setSelectedCategory}
              list={listCategory}
              errorMessages={fields.category.errorMessages}
              dict={fields.category.select.dict}
            />
            <DialogFormPattern<"Category"> 
              open={openCategoryDialog}
              setOpen={setOpenCategoryDialog}
              self={fields.category.formDialog.self}
              formPattern={{
                ...fields.category.formDialog.formPattern,
                form: {
                  ...fields.category.formDialog.formPattern.form,
                  initialState: {
                    ...fields.category.formDialog.formPattern.form.initialState
                  }
                }
              }}
              showButton
            />
          </div>
        )}
        {fields.subcategory && filteredSubcategory && (selectedCategory != emptyCategory) && (
          <div className="flex gap-2 items-end">
            <SelectFieldPattern<"Subcategory"> 
              name="Subcategory"
              element={selectedSubcategory}
              setElement={setSelectedSubcategory}
              list={filteredSubcategory}
              errorMessages={fields.subcategory.errorMessages}
              dict={fields.subcategory.select.dict}
            />
            <DialogFormPattern<"Subcategory"> 
              open={openSubcategoryDialog}
              setOpen={setOpenSubcategoryDialog}
              self={fields.subcategory.formDialog.self}
              formPattern={{
                ...fields.subcategory.formDialog.formPattern,
                form: {
                  ...fields.subcategory.formDialog.formPattern.form,
                  initialState: {
                    ...defaultSubcategoryFormState,
                    result: {
                      id: "",
                      name: "",
                      description: "",
                      category: selectedCategory.id ? selectedCategory.id : "",
                    }
                  }
                }
              }}
              showButton
            />
          </div>
        )}
      </div>
    </div>
  )
}
