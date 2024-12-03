//"use client"

//import { useState, useEffect } from "react";
//import { synchronizeList } from "@/app/lib/synchronizers/lists";
//import streamer from "@/app/lib/workers";

import FormPattern from "../../patterns/form/FormPattern";
import { CheckboxFieldProps, DictItemsForm, fieldsDefaultProps, InputFieldProps, JSONHiddenFieldProps, SelectFieldPropsWithAdd } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { defaultItemCompleteFormState } from "@/app/lib/types/data/items";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";

interface Props {
  dict: DictItemsForm;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    isArchived: CheckboxFieldProps;
    images: InputFieldProps;
    identifier: InputFieldProps;
    quantity: InputFieldProps;
    length: InputFieldProps;
    width: InputFieldProps;
    height: InputFieldProps;
    weight: InputFieldProps;
    button: DictFormButton;

    zoneWithAdd: SelectFieldPropsWithAdd<"Zone">;
    aisleWithAdd: SelectFieldPropsWithAdd<"Aisle">;
    rackWithAdd: SelectFieldPropsWithAdd<"Rack">;
    shelfWithAdd: SelectFieldPropsWithAdd<"Shelf">;
    categoryWithAdd: SelectFieldPropsWithAdd<"Category">;
    subcategoryWithAdd: SelectFieldPropsWithAdd<"Subcategory">;

    variantsJSON: JSONHiddenFieldProps;
    codesJSON: JSONHiddenFieldProps;
  }
}

export default function FormAddItemClient({
  dict,
  fields,
}: Props) {

  return (
    <>
      <FormPattern<"ItemComplete"> 
        showButton
        self={{
          dict: dict,
          fields: {
            ...fieldsDefaultProps,
            name: fields.name,
            description: fields.description,
            isArchived: fields.isArchived,
            images: fields.images,
            identifier: fields.identifier,
            quantity: fields.quantity,
            length: fields.length,
            width: fields.width,
            height: fields.height,
            weight: fields.weight,

            variantsJSON: fields.variantsJSON,
            codesJSON: fields.codesJSON,

            button: fields.button,

            zoneWithAdd: {
              ...fields.zoneWithAdd,
              selectField: {
                ...fields.zoneWithAdd.selectField,
                //list: zones,
              }
            },

            aisleWithAdd: {
              ...fields.aisleWithAdd,
              selectField: {
                ...fields.aisleWithAdd.selectField,
                //list: aisles,
              }
            },

            rackWithAdd: {
              ...fields.rackWithAdd,
              selectField: {
                ...fields.rackWithAdd.selectField,
                //list: racks,
              }
            },

            shelfWithAdd: {
              ...fields.shelfWithAdd,
              selectField: {
                ...fields.shelfWithAdd.selectField,
                //list: shelfs,
              }
            },
            categoryWithAdd: {
              ...fields.categoryWithAdd,
              selectField: {
                ...fields.categoryWithAdd.selectField,
                //list: categories,
              }
            },
            subcategoryWithAdd: {
              ...fields.subcategoryWithAdd,
              selectField: {
                ...fields.subcategoryWithAdd.selectField,
                //list: subcategories,
              }
            },
          }
        }}
        form={{
          formName: "AddItemComplete",
          initialState: defaultItemCompleteFormState,
          formAction: createFormAction,
        }}
        type="ItemComplete"
      />
    </>
  )
}
