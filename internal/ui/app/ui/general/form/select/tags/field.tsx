"use client";

import { useState, useEffect } from "react";
import { Category, Subcategory } from "@/app/lib/types";
import SelectCategory from "../category/field";
import SelectSubcategory from "../subcategory/field";
import DialogAddSubcategory from "../../add/subcategory/dialog";
import DialogAddCategory from "../../add/category/dialog";

interface SelectCategoryProps {
  locale: string;
  categories: Category[];
  subcategories: Subcategory[];

  dict_category_select: any;
  dict_subcategory_select: any;

  dict_category_add_dialog: any;
  dict_subcategory_add_dialog: any;
}

export default function SelectTags({ 
  categories, 
  subcategories, 
  locale, 
  dict_category_select,
  dict_subcategory_select,
  dict_category_add_dialog,
  dict_subcategory_add_dialog,
}: SelectCategoryProps) {

  const [category, setCategory] = useState({
    id: "", 
    name: "", 
    description: "",
  })
  const [categoryList, setCategoryList] = useState(categories)
  
  const [subcategory, setSubcategory] = useState({
    id: "", 
    name: "", 
    description: "",
    category: "",
  })
  const [subcategoryList, setSubcategoryList] = useState(subcategories)
  const [subcategoryFilteredList, setSubcategoryFilteredList] 
    = useState(subcategories)

  async function handleNewCategory(item: Category) {
    const newList = categoryList
    newList.push(item)
    setCategoryList(newList)
    setCategory(item)
  }

  async function handleNewSubcategory(item: Subcategory) {
    const newList = subcategoryList
    newList.push(item)
    setSubcategoryList(newList)
    setSubcategory(item)
  }

  useEffect(() => {
    // Filters subcategories based on the select category
    const newList = []
    for (let i = 0; i < subcategoryList.length; i++) {
      if (subcategoryList[i].category === category.id) {
        newList.push(subcategoryList[i])
      }
    }
    setSubcategoryFilteredList(newList)
  }, [category, subcategory])

  useEffect(() => {
    // Reset subcategory if not related to the category
    if (category.id !== subcategory.category) {
      setSubcategory({
        id: "", 
        name: "", 
        description: "",
        category: "",
      });
    }
  }, [category])

  return (
    <>
      <div className="w-full mb-2">
        <div className="flex w-full items-end">
          <SelectCategory
            category={category}
            categories={categories}
            setCategory={setCategory}
            dict_category_select={dict_category_select} />
          <DialogAddCategory 
            handleAddCategory={handleNewCategory} 
            locale={locale} 
            dict_add_dialog={dict_category_add_dialog} />
        </div>
      </div>
      { category.id !== "" && (
        <div className="w-full mb-2">
          <div className="flex w-full items-end">
            <SelectSubcategory
              subcategory={subcategory}
              subcategories={subcategoryFilteredList}
              setSubcategory={setSubcategory}
              dict_subcategory_select={dict_subcategory_select} />
            <DialogAddSubcategory 
              handleAddSubcategory={handleNewSubcategory}
              locale={locale} 
              category={category}
              dict_add_dialog={dict_subcategory_add_dialog} />
          </div>
        </div>
      )}
    </>
  )
}
