"use client"

import { useState, useEffect } from "react";

import FormPattern from "../../patterns/form/FormPattern";
import { CheckboxFieldProps, DictItemsForm, fieldsDefaultProps, InputFieldProps, JSONHiddenFieldProps, SelectFieldPropsWithAdd } from "@/app/lib/types/form/fields";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { defaultItemCompleteFormState } from "@/app/lib/types/data/items";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

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
  const [zones, setZones] = useState(fields.zoneWithAdd.selectField.list)
  const [aisles, setAisles] = useState(fields.aisleWithAdd.selectField.list)
  const [racks, setRacks] = useState(fields.rackWithAdd.selectField.list)
  const [shelfs, setShelfs] = useState(fields.shelfWithAdd.selectField.list)
  const [categories, setCategories] = useState(fields.categoryWithAdd.selectField.list)
  const [subcategories, setSubcategories] = useState(fields.subcategoryWithAdd.selectField.list)

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: zones,
      setList: setZones,
      type: "Zone",
    });

    synchronizeList<"Aisle">({
      streamer: streamer as Worker,
      list: aisles,
      setList: setAisles,
      type: "Aisle",
    });

    synchronizeList<"Rack">({
      streamer: streamer as Worker,
      list: racks,
      setList: setRacks,
      type: "Rack",
    });

    synchronizeList<"Shelf">({
      streamer: streamer as Worker,
      list: shelfs,
      setList: setShelfs,
      type: "Shelf",
    });

    synchronizeList<"Category">({
      streamer: streamer as Worker,
      list: categories,
      setList: setCategories,
      type: "Category",
    });

    synchronizeList<"Subcategory">({
      streamer: streamer as Worker,
      list: subcategories,
      setList: setSubcategories,
      type: "Subcategory",
    });
  }, []);

  return (
    <>
      <FormPattern<"ItemComplete"> 
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
                list: zones,
              }
            },
            aisleWithAdd: {
              ...fields.aisleWithAdd,
              selectField: {
                ...fields.aisleWithAdd.selectField,
                list: aisles,
              }
            },
            rackWithAdd: {
              ...fields.rackWithAdd,
              selectField: {
                ...fields.rackWithAdd.selectField,
                list: racks,
              }
            },
            shelfWithAdd: {
              ...fields.shelfWithAdd,
              selectField: {
                ...fields.shelfWithAdd.selectField,
                list: shelfs,
              }
            },
            categoryWithAdd: {
              ...fields.categoryWithAdd,
              selectField: {
                ...fields.categoryWithAdd.selectField,
                list: categories,
              }
            },
            subcategoryWithAdd: {
              ...fields.subcategoryWithAdd,
              selectField: {
                ...fields.subcategoryWithAdd.selectField,
                list: subcategories,
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
