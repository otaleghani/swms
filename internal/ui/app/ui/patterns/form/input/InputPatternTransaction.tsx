"use client";

/** React hooks */
import { useState } from "react";

/** Local components */
import { Button } from "@/app/ui/components/button";

/** Third party components */
import { Minus, PlusIcon } from "lucide-react";
import { GeistSans } from "geist/font/sans";


interface InputProps {
  defaultValue?: number;
  name: string;
  id: string;
}

export function InputPatternNumberWithButtons({
  defaultValue,
  name,
  id,
}: InputProps) {
  const [value, setValue] = useState(defaultValue ? defaultValue : 0);

  const subOne = (() => {
    if (value > 0) {
      setValue(value-1)
    }
  });

  const addOne = (() => {
    setValue(value+1)
  });
  
  const handleInputChange = (event: any) => {
    if (!isNaN(parseInt(event.target.value))) {
      setValue(Number(event.target.value))
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Backspace" && value < 10) {
      setValue(0);
    }
  }

  return (
    <div className="flex items-center">
      <Button className="flex rounded-full w-12 h-12" 
      variant="secondary" 
      onClick={subOne} 
      type="button">
        <Minus className="w-4 h-4"/>
      </Button>
      <input 
        suppressHydrationWarning
        id={id}
        key="quantity"
        name={name}
        type="number"
        placeholder="0"
        min="0"
        inputMode="numeric" 
        value={String(value)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => e.target.select()}
        className={`${GeistSans.className} font-bold text-8xl block text-foreground w-full text-center leading-none tracking-tighter`}
      />
      <Button className="flex rounded-full w-12 h-12" 
      variant="secondary" 
      onClick={addOne} 
      type="button">
        <PlusIcon className="w-4 h-4"/>
      </Button>
    </div>
  )
}
