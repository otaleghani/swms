"use client";

import { useState } from "react";

import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Button } from "@/components/button";
import { CirclePlus } from "lucide-react";
import { DialogAddCategory } from "./dialog";

interface SelectCategoryProps {
  data: {
    id: string;
    name: string;
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

export default function SelectCategory({ data, lang, dict }: SelectCategoryProps) {
  const [element, setElement] = useState("")
  const [list, setList] = useState(data)

  async function handleNewCategory(item: any) {
    const newList = list
    newList.push(item)
    setList(newList)
    setElement(item.id)
  }

  return (
    <div className="flex w-full">
      <input type="hidden" name="category" value={element} />
      <ComboboxSelect 
        list={list} 
        element={element} 
        setElement={setElement} 
        dict={dict.combobox} />
      <DialogAddCategory 
        handler={handleNewCategory} 
        lang={lang} 
        dict={dict} />
    </div>
  )
}
