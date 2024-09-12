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
  dict_supplier_code_delete_dialog: any;
  dict_supplier_code_edit_dialog: any;

  suppliers: Supplier[];

  setVariantsJSON: React.Dispatch<React.SetStateAction<string>>;
  setCodesJSON: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddVariantComponent({
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
}: AddVariantComponentProps) {


  return (
    <>
      <AddVariantsField
        locale={locale}

        dict_general_fields={dict_general_fields}
        dict_variant_add_form={dict_variant_add_form}
        dict_variant_delete_dialog={dict_variant_delete_dialog}
        dict_variant_edit_dialog={dict_variant_edit_dialog}
        dict_supplier_add_dialog={dict_supplier_add_dialog}
        dict_supplier_code_delete_dialog={dict_supplier_code_delete_dialog}
        dict_supplier_code_edit_dialog={dict_supplier_code_edit_dialog}

        suppliers={suppliers}
        setVariantsJSON={setVariantsJSON}
        setCodesJSON={setCodesJSON}
      />
    </>
  )
} 
