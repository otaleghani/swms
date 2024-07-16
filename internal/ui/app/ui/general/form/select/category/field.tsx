"use client";

import { ComboboxSelect } from "../../select";
import { Button } from "@/components/button";
import { CirclePlus } from "lucide-react";

export default function CategoryOption() {
  return (
    <div className="flex">
      <ComboboxSelect />
      <Button><CirclePlus />add new</Button>
    </div>
  )
}
