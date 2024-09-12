"use client";

import { useState, useEffect, useActionState } from "react";

import { Variant, Supplier, SupplierCode } from "@/app/lib/types";

/** Components */
import VariantsTable from "../table/component";
import VariantAddSheet from "./sheet";

interface AddVariantsFieldProps {
  locale: string;

  dict_general_fields: any;

  dict_variant_add_form: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
  dict_supplier_add_dialog: any;
  dict_supplier_code_delete_dialog: any;
  dict_supplier_code_edit_dialog: any;

  suppliers: Supplier[];
  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
  setCodesJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantsField({
  locale,

  dict_general_fields,
  dict_variant_add_form,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,

  dict_supplier_add_dialog,
  dict_supplier_code_delete_dialog,
  dict_supplier_code_edit_dialog,

  suppliers,
  setVariantsJSON,
  setCodesJSON,
}: AddVariantsFieldProps) {

  const [variants, setVariants] = useState([] as Variant[]);
  const [codes, setCodes] = useState([] as SupplierCode[]);

  useEffect(() => {
    // Updates variants JSON
    setVariantsJSON(JSON.stringify(variants));
  }, [variants])

  useEffect(() => {
    // Updates codes JSON
    setCodesJSON(JSON.stringify(codes));
  }, [codes])

  return (
      <div className="pb-4 bg-white p-4 rounded"> 
        <h3 className="font-semibold pb-2"> 
          {dict_variant_add_form.table.title} 
        </h3>
        <div className="mb-4">
          <VariantsTable 
            locale={locale}
            variants={variants}

            dict={dict_variant_add_form}
            dict_form_fields={dict_general_fields}
            dict_variant_delete_dialog={dict_variant_delete_dialog}
            dict_variant_edit_dialog={dict_variant_edit_dialog}
            dict_supplier_add_dialog={dict_supplier_add_dialog}
            dict_supplier_code_delete_dialog={dict_supplier_code_delete_dialog}
            dict_supplier_code_edit_dialog={dict_supplier_code_edit_dialog}

            suppliers={suppliers}

            setVariants={setVariants}
            setCodes={setCodes}

            codes={codes}
          />
        </div>
        <VariantAddSheet 
          locale={locale}

          dict_general_fields={dict_general_fields}
          dict_variant_add_form={dict_variant_add_form}
          dict_supplier_add_dialog={dict_supplier_add_dialog}
          dict_supplier_code_delete_dialog={dict_supplier_code_delete_dialog}
          dict_supplier_code_edit_dialog={dict_supplier_code_edit_dialog}

          suppliers={suppliers}
          setVariants={setVariants}
          setCodes={setCodes}
        />
      </div>
  )
}
