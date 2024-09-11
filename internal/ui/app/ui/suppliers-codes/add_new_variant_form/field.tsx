"use client";

/** React hooks */
import { useState, useEffect } from "react";

/** Types */
import { Supplier, SupplierCode, Variant } from "@/app/lib/types"

/** Components */
import SelectSupplierWithAdd from "../../general/form/select/fields/supplier/field_add";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import FormFieldError from "../../general/form/error_field";

interface AddCodeVariant {
  locale: string;
  suppliers: Supplier[];
  dict_form_fields: any;
  dict_add_dialog: any;
  setCodes: React.Dispatch<React.SetStateAction<SupplierCode[]>>;
}

export default function AddCodeVariant({
  locale,
  suppliers,
  dict_add_dialog,
  dict_form_fields,
  setCodes,
}: AddCodeVariant) {

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [supplier, setSupplier] = useState({id: "", name: ""} as Supplier);
  const [codeErrors, setCodeErrors] = useState([] as string[]);
  const [supplierErrors, setSupplierErrors] = useState([] as string[]);

  useEffect(() => {
    if (open) {
      // Validation for the code
      const currentCodeErrors = [] as string[];
      const currentSupplierErrors = [] as string[];

      if (code == undefined || code == null || code == "") {
        currentCodeErrors.push("Non pote essere vuoto");
      };
      if (code.length < 0 && code.length > 50) {
        currentCodeErrors.push("Non pote essere vuoto");
      };

      // Validation for supplier
      if (supplier == undefined || supplier == null || supplier.id == "") {
        currentSupplierErrors.push("Supplier non pote esseere nullo");
      };
      if (supplier.id?.length != 36) {
        currentSupplierErrors.push("Sembra che non sia un uuid");
      };

      setSupplierErrors(currentSupplierErrors);
      setCodeErrors(currentCodeErrors);

      // Adds the new item to the codes array
      if (codeErrors.length == 0 && supplierErrors.length == 0) {
        const currentCode = { code: code, supplier: supplier.id } as SupplierCode;
        setCodes(prev => [...prev, currentCode])
      };

      setOpen(false);
    }
    
  }, [open])

  const handleInputChange = (event:any) => {
    setCode(event.target.value); // Update the state with the new input value
  };

  return (

    <div>
      <SelectSupplierWithAdd 
        locale={locale}
        suppliers={suppliers}
        supplier={supplier}
        setSupplier={setSupplier}
        dict_form_fields={dict_form_fields}
        dict_add_dialog={dict_add_dialog}
        error_messages={[]}
      />
      <FormFieldError 
        id="name-error" 
        description={supplierErrors} 
      />

      <Label>{dict_form_fields.fields.codes.label}</Label>
      <Input 
        name={dict_form_fields.fields.codes.label}
        value={code}
        onChange={handleInputChange}
        placeholder={dict_form_fields.fields.codes.placeholder}
      />
      <FormFieldError 
        id="name-error" 
        description={codeErrors} 
      />

      <Button 
        className="mt-4" 
        type="button" 
        variant="secondary" 
        onClick={() => {setOpen(true)}}
      >
        {dict_form_fields.buttons.add.active}
      </Button>
    </div>
  )
}
