"use client";

/** Types */
import { 
  Aisle,
  Category,
  Rack,
  Shelf,
  Subcategory, 
  Zone,
  Supplier
} from "@/app/lib/types";

/** Components*/
import FormAddItem from "@/app/ui/items/add/form";
import ItemHeaderAdd from "@/app/ui/items/headers/add";
import { ScrollArea } from "@/components/scroll-area";
import AddVariantsField from "@/app/ui/variants/add/field_form_items";

/** Hooks */
import { useState } from "react";
import AddVariantComponent from "../../suppliers-codes/add_new_variant_form/component";

interface AddItemPageLayoutProps {
  formName: string;
  locale: string;

  dict_header: any;
  dict_general_fields: any;
  dict_item_add_new: any;
  dict_upload_image: any;

  dict_category_add_dialog: any;
  dict_subcategory_add_dialog: any;
  dict_zone_add_dialog: any;
  dict_aisle_add_dialog: any;
  dict_rack_add_dialog: any;
  dict_shelf_add_dialog: any;
  dict_supplier_add_dialog: any;

  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
  dict_variant_add_form: any;

  dict_category_select: any;
  dict_subcategory_select: any;
  dict_zone_select: any;
  dict_aisle_select: any;
  dict_rack_select: any;
  dict_shelf_select: any;

  categories: Category[];
  subcategories: Subcategory[];
  zones: Zone[];
  aisles: Aisle[];
  racks: Rack[];
  shelfs: Shelf[];
  suppliers: Supplier[];
}

export default function AddItemPageComponent({
  formName,
  locale,

  dict_header,
  dict_general_fields,
  dict_item_add_new,
  dict_upload_image,

  dict_category_add_dialog,
  dict_subcategory_add_dialog,
  dict_zone_add_dialog,
  dict_aisle_add_dialog,
  dict_rack_add_dialog,
  dict_shelf_add_dialog,
  dict_supplier_add_dialog,

  dict_variant_delete_dialog,
  dict_variant_edit_dialog,
  dict_variant_add_form,

  dict_category_select,
  dict_subcategory_select,
  dict_zone_select,
  dict_aisle_select,
  dict_rack_select,
  dict_shelf_select,

  categories,
  subcategories,
  zones,
  aisles,
  racks,
  shelfs,
  suppliers,
}: AddItemPageLayoutProps) {
  const [ variantsJSON, setVariantsJSON ] = useState("[{}]");

  return (
    <>
      <ItemHeaderAdd
        dict_header={dict_header}
        dict_general_fields={dict_general_fields}
        formName={formName} />
      <div className="grid bg-gray-100 w-full">
        <div className="w-dvw xl:max-w-prose p-4 m-auto">
          <FormAddItem 
            locale={locale}
            formName={formName}
            dict_item_add_new={{}}
            dict_general_fields={dict_general_fields}
            dict_upload_image={dict_upload_image}

            dict_category_add_dialog={dict_category_add_dialog}
            dict_subcategory_add_dialog={dict_subcategory_add_dialog}
            dict_zone_add_dialog={dict_zone_add_dialog}
            dict_aisle_add_dialog={dict_aisle_add_dialog}
            dict_rack_add_dialog={dict_rack_add_dialog}
            dict_shelf_add_dialog={dict_shelf_add_dialog}

            dict_category_select={dict_category_select}
            dict_subcategory_select={dict_subcategory_select}
            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select}
            dict_rack_select={dict_rack_select}
            dict_shelf_select={dict_shelf_select}

            categories={categories}
            subcategories={subcategories} 
            zones={zones}
            aisles={aisles}
            racks={racks}
            shelfs={shelfs}
            variantsJSON={variantsJSON}
          />
          <AddVariantComponent 
            locale={locale}

            dict_general_fields={dict_general_fields}
            dict_variant_add_form={dict_variant_add_form}
            dict_variant_delete_dialog={dict_variant_delete_dialog}
            dict_variant_edit_dialog={dict_variant_edit_dialog}
            dict_supplier_add_dialog={dict_supplier_add_dialog}

            suppliers={suppliers}
            setVariantsJSON={setVariantsJSON}
          />
        </div>
      </div>
    </>
  )
}
