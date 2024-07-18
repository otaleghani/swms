"use client";

import { useState, useEffect } from "react";

import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { DialogAddCategory } from "./dialog";
import { DialogAddSubcategory } from "../subcategory/dialog";

interface SelectCategoryProps {
  categoryData: { id: string; name: string;
  }[],
  subcategoryData: {
    id: string;
    name: string;
    category: string;
  }[],
  lang: string;
  dictCategory: {
    combobox: {
      select: string;
      search: string;
      empty: string;
    },
    title: string;
    description: string;
    fields: {
      name: {
        label: string;
        placeholder: string;
      };
      description: {
        label: string;
        placeholder: string;
      };
    };
    button: string;
    pending: string;
    success: string;
  };
  dictSubcategory: any;
}

export default function SelectCategory({ categoryData, subcategoryData, lang, dictCategory, dictSubcategory }: SelectCategoryProps) {
  const [category, setCategory] = useState({id: "", name: ""})
  const [categoryList, setCategoryList] = useState(categoryData)
  
  const [subcategory, setSubcategory] = useState({id: "", name: "", category: ""})
  const [subcategoryList, setSubcategoryList] = useState(subcategoryData)
  const [subcategoryFilteredList, setSubcategoryFilteredList] = useState(subcategoryData)

  async function handleNewCategory(item: any) {
    const newList = categoryList
    newList.push(item)
    setCategoryList(newList)
    setCategory(item)
  }
  async function handleNewSubcategory(item: any) {
    const newList = subcategoryList
    newList.push(item)
    setSubcategoryList(newList)
    setSubcategory(item)
  }

  useEffect(() => {
    // FILTER SUBCATEGORIES BASED ON THE CATEGORY
    const newList = []
    for (let i = 0; i < subcategoryList.length; i++) {
      if (subcategoryList[i].category === category.id) {
        newList.push(subcategoryList[i])
      }
    }
    setSubcategoryFilteredList(newList)
  }, [category, subcategory])

  useEffect(() => {
    if (category.id !== subcategory.category) {
      setSubcategory({id: "", name: "", category: ""});
    }
  }, [category])

  return (
    <>
      <div className="flex w-full">
        <input type="hidden" name="category" value={category.id} />
        <ComboboxSelect 
          list={categoryList} 
          element={category} 
          setElement={setCategory} 
          dict={dictCategory.combobox} />
        <DialogAddCategory 
          handler={handleNewCategory} 
          lang={lang} 
          dict={dictCategory} />
      </div>
      { category.id !== "" && (
        <div className="flex w-full">
          <input type="hidden" name="category" value={category.id} />
          <ComboboxSelect 
            list={subcategoryFilteredList} 
            element={subcategory} 
            setElement={setSubcategory} 
            dict={dictSubcategory.combobox} />
          <DialogAddSubcategory 
            handler={handleNewSubcategory}
            lang={lang} 
            category={category}
            dict={dictSubcategory} />
        </div>
      )}
    </>
  )
}
