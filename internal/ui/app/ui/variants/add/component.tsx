"use client";

/** React hooks */
import { useState } from "react";

/** Types */
import { Supplier } from "@/app/lib/types";

/** Components */
import AddVariantsField from "./field_form_items";
import AddCodeVariant from "../../suppliers-codes/add_new_variant_form/field";

interface AddVariantComponentProps {
  locale: string;

  dict_general_fields: any;
  dict_variant_add_form: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
  dict_supplier_add_dialog: any;

  suppliers: Supplier[];

  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantComponent({
  locale,

  dict_general_fields,
  dict_variant_add_form,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,
  dict_supplier_add_dialog,

  suppliers,

  setVariantsJSON,
}: AddVariantComponentProps) {

  const [ supplierCodesJSON, setSupplierCodesJSON ] = useState("[{}]")

  return (
    <>
      <AddVariantsField
        locale={locale}

        dict_general_fields={dict_general_fields}
        dict_variant_add_form={dict_variant_add_form}
        dict_variant_delete_dialog={dict_variant_delete_dialog}
        dict_variant_edit_dialog={dict_variant_edit_dialog}
        dict_supplier_add_dialog={dict_supplier_add_dialog}

        error_messages_supplier={[]}
        error_messages_codes={[]}

        suppliers={suppliers}
        setVariantsJSON={setVariantsJSON}
      />
      <div>
        <div className="grid gap-2 p-5 bg-gray-50 rounded">
        {/* 
          <AddCodeVariant 
            locale={locale}
            suppliers={suppliers}
            dict_add_dialog={dict_supplier_add_dialog}
            dict_form_fields={dict_general_fields}
            error_messages_supplier={[]}
            error_messages_codes={[]}
          />
          Here supplier logic 

          table field -> Shows codes, gives you edit and delete capabilities

          form add new
            add new supplier
            add new code field


          dialog add new
          dialog edit
          dialog delete
        */}
          

        </div>
      </div>
    </>
  )
} 
