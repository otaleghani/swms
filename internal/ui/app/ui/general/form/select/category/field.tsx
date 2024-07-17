"use client";

import { useState } from "react";

import { ComboboxSelect } from "@/app/ui/general/form/select/combobox";
import { Button } from "@/components/button";
import { CirclePlus } from "lucide-react";
import { DialogAddCategory } from "./dialog";

export default function SelectCategory({ data }: { data: any }) {
  const [element, setElement] = useState("")
  const [list, setList] = useState(data)

  async function handleNewCategory(item: any) {
    const newList = list
    newList.push(item)
    setList(newList)
    setElement(newList.value)
  }

  return (
    <div className="flex">
      <input type="hidden" name="category" value={element} />
      <ComboboxSelect 
        list={list} 
        element={element} 
        setElement={setElement} />
      <DialogAddCategory handler={handleNewCategory} />
    </div>
  )
}
