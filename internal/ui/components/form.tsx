'use client'; 
import { createCategory, createItem } from '@/lib/actions';
import React, { useState } from 'react';
import { getItemsName } from '@/lib/reqs';

export function MainForm(props: {items: string[]}) {
  const [selected, setSelected] = useState("");
  const [selectOptions, setSelectOptions] = useState<string[]>(props.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOption = async (name: string) => {
    const data = getItemsName()
    const [ parsedData ] = await Promise.all([data])
    setSelectOptions(parsedData)
    setIsModalOpen(false);
    setSelected(name)
  };
  
  return (
    <div>
      <form className='flex flex-col' action={createItem} id='item'>
        <label htmlFor="select">Choose an option:</label>
        <select id="select" name="select" value={selected} className='p-4'>
          {selectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setIsModalOpen(!isModalOpen)} className='p-4 bg-blue-100'>+ Option</button>
        <button type="submit" className='p-4 bg-yellow-100' form='item'>Send!</button>
      </form>
      {isModalOpen && (<SecondForm onAddOption={handleAddOption} />)}
      {isModalOpen && (<SecondForm onAddOption={handleAddOption} />)}
    </div>
  );
}

function SecondForm(props: {onAddOption: (category: string) => void}) {
  async function handleFormCat(formData: FormData) {
    await createCategory(formData)
    // Handle errors here
    props.onAddOption(formData.get('name') as string)
  }
  
  return (
    <form action={handleFormCat} id="category">
      <input type="text" id="name" name="name" className='bg-rose-50 w-full p-4'/>
      <button type="submit" className='p-4 bg-blue-50 w-full' form='category'>Add new Option</button>
    </form>
  );
}
