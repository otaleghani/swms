"use client";

import { useState, useEffect } from "react";

import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { DialogAddCategory } from "./dialog";
import { DialogAddSubcategory } from "../subcategory/dialog";

interface SelectCategoryProps {
  categoryData: {
    id: string;
    name: string;
  }[],
  subcategoryData: {
    id: string;
    name: string;
    category: string;
  }[],
  lang: string;
  dict: {
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
  }
}

export default function SelectCategory({ categoryData, subcategoryData, lang, dict }: SelectCategoryProps) {
  const [category, setCategory] = useState({id: "", name: ""})
  const [categoryList, setCategoryList] = useState(categoryData)
  
  const [subcategory, setSubcategory] = useState({id: "", name: "", category: ""})
  const [subcategoryList, setSubcategoryList] = useState(subcategoryData)

  async function handleNewCategory(item: any) {
    const newList = categoryList
    newList.push(item)
    setCategoryList(newList)
    setCategory(item)
  }

  // handle new subcategory?
  // Yes, it has to chage the subcategory and the list

  useEffect(() => {
    // if (category.id === "") => resetta subcategory
    console.log(subcategoryList)
    
  }, [category])

  return (
    <>
      <div className="flex w-full">
        <input type="hidden" name="category" value={category.id} />
        <ComboboxSelect 
          list={categoryList} 
          element={category} 
          setElement={setCategory} 
          dict={dict.combobox} />
        <DialogAddCategory 
          handler={handleNewCategory} 
          lang={lang} 
          dict={dict} />
      </div>
      { category.id !== "" && (
        <div className="flex w-full">
          <input type="hidden" name="category" value={category.id} />
          <ComboboxSelect 
            list={subcategoryList} 
            element={subcategory} 
            setElement={setSubcategory} 
            dict={dict.combobox} />
          <DialogAddSubcategory 
            handler={handleNewCategory}
            lang={lang} 
            category={category}
            dict={dict} />
        </div>
      )}
    </>
  )
}
