"use client";

import { Input } from "@/components/input";
import { useState, useActionState } from "react";
import { ComboboxSelect } from "@/app/ui/general/form/select";

export default function AddItemForm() {
  return (
    <form>
      <Input />
      <ComboboxSelect />
    </form>
  )
}
