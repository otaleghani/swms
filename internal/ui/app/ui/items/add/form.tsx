"use client";

import SubmitButton from "../../general/form/button/submit";
import DescriptionInput from "../../general/form/input/description";
import NameInput from "../../general/form/input/name";
import WidthInput from "../../general/form/input/width";
import LengthInput from "../../general/form/input/length";
import HeightInput from "../../general/form/input/heigth";
import WeightInput from "../../general/form/input/weight";
import SelectTags from "../../general/form/select/tags/field";
import { 
  Category, 
  Subcategory,
  Zone,
  Aisle,
  Rack,
  Shelf
} from "@/app/lib/types";
import SelectPosition from "../../general/form/select/position/field";

interface FormAddItemProps {
  locale: string;
  dict_item_add_new: any;
  dict_general_fields: any;

  dict_category_add_dialog: any;
  dict_subcategory_add_dialog: any;
  dict_zone_add_dialog: any;
  dict_aisle_add_dialog: any;
  dict_rack_add_dialog: any;
  dict_shelf_add_dialog: any;

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
}

export default function FormAddItem({
  locale,
  dict_item_add_new,
  dict_general_fields,

  dict_category_add_dialog,
  dict_subcategory_add_dialog,
  dict_zone_add_dialog,
  dict_aisle_add_dialog,
  dict_rack_add_dialog,
  dict_shelf_add_dialog,

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
}: FormAddItemProps) {
  const formName = "form_add_item"

  return (
    <form id={formName} className="p-4">
      <div className="py-4">
        <h3 className="font-semibold pb-2">Informazioni di base</h3>
        <div className="xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
          <NameInput 
            dict={dict_general_fields.input.name}
            className="pb-2"
          />
          <DescriptionInput 
            dict={dict_general_fields.input.description}
            className="pb-2"
          />
          <SelectTags 
            categories={categories}
            subcategories={subcategories}
            locale={locale}
            dict_category_select={dict_category_select}
            dict_subcategory_select={dict_subcategory_select}
            dict_category_add_dialog={dict_category_add_dialog}
            dict_subcategory_add_dialog={dict_subcategory_add_dialog}
          />
        </div>
      </div>
      <div className="py-4">
        <h3 className="font-semibold pb-2">Dimensione</h3>
        <div className="xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
          <WidthInput 
            dict={dict_general_fields.input.width}
            className=""
          />
          <LengthInput 
            dict={dict_general_fields.input.length}
            className=""
          />
          <HeightInput 
            dict={dict_general_fields.input.height}
            className=""
          />
          <WeightInput 
            dict={dict_general_fields.input.weight}
            className=""
          />
        </div>
      </div>

      <div className="py-4">
        <h3 className="font-semibold pb-2">Posizione</h3>
        <div className="grid xl:grid-cols-1 
                        gap-2 p-5 bg-gray-50 rounded">
          <SelectPosition
            locale={locale}

            zones={zones}
            aisles={aisles}
            racks={racks}
            shelfs={shelfs}

            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select}
            dict_rack_select={dict_rack_select}
            dict_shelf_select={dict_shelf_select}

            dict_zone_add_dialog={dict_zone_add_dialog}
            dict_aisle_add_dialog={dict_aisle_add_dialog}
            dict_rack_add_dialog={dict_rack_add_dialog}
            dict_shelf_add_dialog={dict_shelf_add_dialog} />
        </div>
      </div>



      <SubmitButton 
        isPending={false}
        dict={dict_general_fields.button.submit}
        className="pt-2"
        form={formName}
      />
    </form>
  )
}
