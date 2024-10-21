"use client"

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { SelectableItem } from "@/app/lib/types/form/fields"
import { FormMap } from "@/app/lib/types/form/form"
import { SelectFieldPatternCombobox } from "../form/select/SelectFieldPatternCombobox"

import { DictSelectField, DictSelectFieldCombobox } from '@/app/lib/types/dictionary/form';

interface Props<T extends SelectableItem> {
  name: T;
  list: FormMap[T][];
  dict: DictSelectField;
  element: FormMap[T];
  setElement: Dispatch<SetStateAction<FormMap[T]>>
}

export default function ForeignKeyFilter<T extends SelectableItem>({
  name,
  list,
  dict,
  element,
  setElement
}: Props<T>) {
  return (
    <>
      <SelectFieldPatternCombobox<T> 
        name={name}
        list={list}
        element={element}
        setElement={setElement}
        dict={dict}
      />
    </>
  )
}
