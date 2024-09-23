"use client";

/** React hooks */
import { useEffect } from "react";

/** Local components */
import { Button } from "@/app/ui/components/button";

/** Third party components */
import { Minus, PlusIcon } from "lucide-react";
import { GeistSans } from "geist/font/sans";


interface InputProps {
  name: string;
  id: string;
}

export function InputPatternNumberWithButtons({
  name,
  id,
}: InputProps) {
  const subOne = (() => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (Number(input.value) > 0) {
      input.value = String(Number(input.value) - 1)
    }
  });

  const addOne = (() => {
    const input = document.getElementById(id) as HTMLInputElement;
    input.value = String(Number(input.value) + 1)
  });

  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement;

    if (Number(input.value) < 0) {
      input.value = String(Number(0))
    }
  }, [document.getElementById(id)])

  return (
    <div className="flex items-center">
      <Button className="flex rounded-full w-12 h-12" variant="secondary" onClick={subOne} type="button"><Minus className="w-4 h-4"/></Button>
      <input 
        id={id}
        key="quantity"
        name={name}
        type="number"
        placeholder="0"
        min="0"
        inputMode="numeric" 
        //value={0}
        onFocus={(e) => e.target.select()}
        className={`${GeistSans.className} font-bold text-8xl block text-foreground w-full text-center leading-none tracking-tighter`}
      />
      <Button className="flex rounded-full w-12 h-12" variant="secondary" onClick={addOne} type="button"><PlusIcon className="w-4 h-4"/></Button>
    </div>

  )
}
