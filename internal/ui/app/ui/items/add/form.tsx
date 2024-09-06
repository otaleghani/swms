"use client";

/** React Hooks */
import { useActionState, useEffect } from "react";
import { AddItemFormState, AddItemFormAction } from "./action";

/** Components */
import UploadImageField from "../../general/form/files/item-image/field";
import DescriptionInput from "../../general/form/input/description";
import NameInput from "../../general/form/input/name";
import WidthInput from "../../general/form/input/width";
import LengthInput from "../../general/form/input/length";
import HeightInput from "../../general/form/input/height";
import WeightInput from "../../general/form/input/weight";
import IdentifierInput from "../../general/form/input/identifier";
import QuantityInput from "../../general/form/input/quantity";
import SelectTags from "../../general/form/select/tags/field";
import SelectPosition from "../../general/form/select/position/field";
import FormSuccess from "../../general/form/success";
import FormError from "../../general/form/error_form";

/** Types */
import { 
  Category, 
  Subcategory,
  Zone,
  Aisle,
  Rack,
  Shelf
} from "@/app/lib/types";

interface FormAddItemProps {
  locale: string;
  formName: string;
  dict_item_add_new: any;
  dict_general_fields: any;
  dict_upload_image: any;

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

  variantsJSON: string;
}

export default function FormAddItem({
  locale,
  formName,
  dict_item_add_new,
  dict_general_fields,
  dict_upload_image,

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
  variantsJSON,
}: FormAddItemProps) {
  const initialState: AddItemFormState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      category: [],
      subcategory: [],
      zone: [],
      aisle: [],
      rack: [],
      shelf: [],
      identifier: [],
      quantity: [],
      width: [],
      height: [],
      length: [],
      weight: [],
      images: [],
      variants: [],
    },
    message: "",
  };

  const [state, action, isPending] = useActionState(AddItemFormAction, initialState);

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <form className="" id={formName} action={action}>
      <div className="pb-4">
        <h3 className="font-semibold pb-2">Informazioni di base</h3>
        <div className="xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
          <NameInput 
            dict={dict_general_fields.fields.name}
            className="pb-2"
            error_messages={state.errorMessages.name}
          />
          <DescriptionInput 
            dict={dict_general_fields.fields.description}
            className="pb-2"
            error_messages={state.errorMessages.description}
          />
          <SelectTags 
            categories={categories}
            subcategories={subcategories}
            locale={locale}
            dict_category_select={dict_category_select}
            dict_subcategory_select={dict_subcategory_select}
            dict_category_add_dialog={dict_category_add_dialog}
            dict_subcategory_add_dialog={dict_subcategory_add_dialog}
            description_category={state.errorMessages.category}
            description_subcategory={state.errorMessages.subcategory}
          />
        </div>
      </div>

      <div className="py-4">
        <h3 className="font-semibold pb-2">Variante principale</h3>
          <div className="grid xl:grid-cols-2 gap-2 p-5 bg-gray-50 rounded">
            <IdentifierInput 
              dict={dict_general_fields.fields.identifier}
              className=""
              error_messages={state.errorMessages.identifier}
            />
            <QuantityInput
              dict={dict_general_fields.fields.quantity}
              className=""
              error_messages={state.errorMessages.quantity}
            />
          </div>
        <div className="grid xl:grid-cols-4 gap-2 p-5 bg-gray-50 rounded">
          <WidthInput 
            dict={dict_general_fields.fields.width}
            className=""
            error_messages={state.errorMessages.width}
          />
          <LengthInput 
            dict={dict_general_fields.fields.length}
            className=""
            error_messages={state.errorMessages.length}
          />
          <HeightInput 
            dict={dict_general_fields.fields.height}
            className=""
            error_messages={state.errorMessages.height}
          />
          <WeightInput 
            dict={dict_general_fields.fields.weight}
            className=""
            error_messages={state.errorMessages.weight}
          />
        </div>
      </div>

      <div className="pt-4">
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
            dict_shelf_add_dialog={dict_shelf_add_dialog}

            description_zone={state.errorMessages.zone}
            description_aisle={state.errorMessages.aisle}
            description_rack={state.errorMessages.rack}
            description_shelf={state.errorMessages.shelf}
          />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-semibold pb-2">Immagini</h3>
        <div className="bg-gray-50 p-5 rounded">
          <UploadImageField 
            dict_upload_image={dict_upload_image}
            description={state.errorMessages.images}
          />
        </div>
      </div>
      <input type="hidden" name="variants" value={variantsJSON} />
      <input type="hidden" name="locale" value={locale} />

      {state.error ? (
        <FormError 
          message={state.message!} />
      ) 
      : (
        <FormSuccess message={state.message!} />
      )}
    </form>
  )
}
