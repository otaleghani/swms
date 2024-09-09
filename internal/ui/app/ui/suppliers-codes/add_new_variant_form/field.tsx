/** Field used to add a code for a variant */

import { Supplier, Variant } from "@/app/lib/types"
import SelectSupplierWithAdd from "../../general/form/select/fields/supplier/field_add";
import SupplierCodeInput from "../../general/form/input/supplier_code";

interface AddCodeVariant {
  locale: string;

  suppliers: Supplier[];
  
  dict_form_fields: any;
  dict_add_dialog: any;

  error_messages_supplier: string[];
  error_messages_codes: string[];
}


export default function AddCodeVariant({
  locale,
  suppliers,
  dict_add_dialog,
  dict_form_fields,
  error_messages_supplier,
  error_messages_codes,
}: AddCodeVariant) {
  return (

    <div>
      <SelectSupplierWithAdd 
        locale={locale}
        suppliers={suppliers}
        dict_form_fields={dict_form_fields}
        dict_add_dialog={dict_add_dialog}
        error_messages={error_messages_supplier}
      />

      <SupplierCodeInput 
        dict={dict_form_fields.fields.codes}
        className=""
        error_messages={error_messages_codes}
      />
    </div>
  )
}
