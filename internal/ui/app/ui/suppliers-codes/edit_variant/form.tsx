"use client";

import { useEffect, useState } from "react"
import { EditSupplierCodeAction, EditSupplierCodeState } from "./action";
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Supplier, Item, Variant } from "@/app/lib/types";
import { EditSupplierCodeDialogProps } from "./dialog";

interface EditSupplierCodeFormProps extends EditSupplierCodeDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditSupplierCodeVariantForm({ 
  dict, 
  locale, 
  supplierCode,
  setOpen,
  setCodes,
}: EditSupplierCodeFormProps ) {
  const initialState: EditSupplierCodeState = {
    error: false,
    errorMessages: { 
      id: [], 
      code: [], 
      supplier: [], 
      item: [], 
      variant: [], 
    },
    message: "",
  }
  const [fire, setFire] = useState(false);
  const [code, setCode] = useState(supplierCode.code);
  const [supplier, setSupplier] = useState(supplierCode.supplier);

  const [codeErrors, setCodeErrors] = useState([] as string[]);
  const [supplierErrors, setSupplierErrors] = useState([] as string[]);

  const handleInputChange = (event:any) => {
    setCode(event.target.value); 
  };

  useEffect(() => {
    if (fire) {
      setCodes([])
    }
  }, [fire])

  return (
    <>
      <div>
        <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="code"
            value={code}
            onChange={handleInputChange}
            defaultValue={supplierCode.code}
            placeholder={supplierCode.code}
          />
          <FormFieldError 
            id="supplier-error" 
            description={supplierErrors} />
        </div>

        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={supplierCode.supplier} name="supplier" />
        <Button 
          type="button" 
          className="w-full mt-2"
          onClick={() => {setFire(true)}}
        >
          {dict.button}
        </Button>
      </div>
    </>
  )
}
