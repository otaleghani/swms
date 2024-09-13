"use client";

import { useEffect, useState } from "react"
import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { Supplier, Item, Variant, SupplierCode } from "@/app/lib/types";
import { EditSupplierCodeDialogProps } from "./dialog";
import SelectSupplierWithAdd from "../../general/form/select/fields/supplier/field_add";

interface EditSupplierCodeFormProps extends EditSupplierCodeDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditSupplierCodeVariantForm({ 
  dict, 
  dict_form_fields,
  dict_add_dialog,
  locale, 
  code,
  codes,
  supplier,
  suppliers,
  setOpen,
  setCodes,
}: EditSupplierCodeFormProps ) {
  const [edit, setEdit] = useState(false);
  const [currentCode, setCurrentCode] = useState(code.code);
  const [currentSupplier, setCurrentSupplier] = useState(supplier);

  const [codeErrors, setCodeErrors] = useState([] as string[]);
  const [supplierErrors, setSupplierErrors] = useState([] as string[]);

  const handleInputChange = (event:any) => {
    setCurrentCode(event.target.value); 
  };

  useEffect(() => {
    if (edit) {
      const currentCodeErrors = [] as string[];
      const currentSupplierErrors = [] as string[];

      if (currentCode == undefined || currentCode == null || currentCode == "") {
        currentCodeErrors.push("Non pote essere vuoto");
      };
      if (currentCode.length < 0 && currentCode.length > 50) {
        currentCodeErrors.push("Non pote essere vuoto");
      };

      // Validation for supplier
      if (currentSupplier == undefined || currentSupplier == null || currentSupplier.id == "") {
        currentSupplierErrors.push("Supplier non pote esseere nullo");
      };
      if (currentSupplier.id?.length != 36) {
        currentSupplierErrors.push("Sembra che non sia un uuid");
      };

      setSupplierErrors(currentSupplierErrors);
      setCodeErrors(currentCodeErrors);

      // Adds the new item to the codes array
      if (codeErrors.length == 0 && supplierErrors.length == 0) {
        setCodes(prev => (
          prev.map(item => 
            item === code ? { 
              ...item, 
              code: currentCode,
              supplier: currentSupplier.id as string,
            } : item
          )
        ));
        setOpen(false);
      }
      setEdit(false);
    }
  }, [edit])

  return (
    <>
      <div>
        <div>
          <Label>{dict.fields.name.label}</Label>
          <Input 
            name="code"
            value={currentCode}
            onChange={handleInputChange}
            defaultValue={code.code}
            placeholder={code.code}
          />
          <FormFieldError 
            id="supplier-error" 
            description={supplierErrors} 
          />
        </div>

        <SelectSupplierWithAdd 
          locale={locale}
          suppliers={suppliers}
          supplier={currentSupplier}
          setSupplier={setCurrentSupplier}
          dict_form_fields={dict_form_fields}
          dict_add_dialog={dict_add_dialog}
          error_messages={[]}
        />
        <input type="hidden" value={locale} name="locale" />
        <Input type="hidden" value={code.supplier} name="supplier" />
        <Button 
          type="button" 
          className="w-full mt-2"
          onClick={() => {setEdit(true)}}
        >
          {dict.button}
        </Button>
      </div>
    </>
  )
}
