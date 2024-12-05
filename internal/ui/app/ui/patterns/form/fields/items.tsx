"use client"
/** Local components */
import TagsSelectFieldsWithAdd from "@/app/ui/modules/tags/TagsSelectFieldsWithAdd";
import PositionSelectFieldWithAdd from "@/app/ui/modules/positions/PositionSelectFieldWithAdd";
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";
import { emptyZone } from "@/app/lib/types/data/zones";
import { useEffect, useState } from "react";
import SelectFieldPattern from "../select/SelectFieldPattern";
import { Unit } from "@/app/lib/types/data/units";
import SelectUnit from "@/app/ui/modules/units/SelectUnit";

export const ItemCompleteFormFields = ({
  fields,
  result,
  errorMessages,
  dict,
  setResult,
}: FormFieldsPropsWithDictCompleteMap["ItemComplete"]
) => { 

  let defaultCategory = result?.category ? 
    fields.categoryWithAdd.selectField.list.find(
      item => item.id === result.category
    ) : undefined;

  let defaultSubcategory = result?.subcategory ? 
    fields.subcategoryWithAdd.selectField.list.find(
      item => item.id === result.subcategory
    ) : undefined;

  let defaultZone = result?.zone ? 
    fields.zoneWithAdd.selectField.list.find(
      item => item.id === result.zone
    ) : emptyZone;

  let defaultAisle = result?.aisle ? 
    fields.aisleWithAdd.selectField.list.find(
      item => item.id === result.aisle
    ) : undefined;

  let defaultRack = result?.rack ? 
    fields.rackWithAdd.selectField.list.find(
      item => item.id === result.rack
    ) : undefined;

  let defaultShelf = result?.shelf ? 
    fields.shelfWithAdd.selectField.list.find(
      item => item.id === result.shelf
    ) : undefined;

  return (
  <>
    <div className="mb-4 rounded ">
      <h3 className="font-semibold pb-2">{dict?.sections.basics}</h3>
      <div className="xl:grid-cols-4 gap-2">
        <InputPattern 
          field="name"
          dict={fields.name.dict}
          defaultValue={String(result?.name)}
          className=""
          label={true}
          errorMessages={errorMessages.name}
          //setResult={setResult}
        />
        <InputPattern 
          field="description"
          dict={fields.description.dict}
          defaultValue={String(result?.description)}
          className=""
          label={true}
          errorMessages={errorMessages.description as string[]}
          //setResult={setResult}
        />
        <TagsSelectFieldsWithAdd 
          fields={{
            category: {
              select: fields.categoryWithAdd.selectField,
              formDialog: fields.categoryWithAdd.addDialog,
              errorMessages: errorMessages.categoryWithAdd,
              defaultValue: defaultCategory,
            },
            subcategory: {
              select: fields.subcategoryWithAdd.selectField,
              formDialog: fields.subcategoryWithAdd.addDialog,
              errorMessages: errorMessages.subcategoryWithAdd, 
              defaultValue: defaultSubcategory
            },
          }}
        />
      </div>
    </div>

    <div className="mb-4 rounded ">
      <h3 className="font-semibold pb-2">{dict?.sections.defaultVariant}</h3>
      <div className="xl:grid-cols-2 gap-2">
        <InputPattern 
          field="identifier"
          dict={fields.identifier.dict}
          defaultValue={String(result?.identifier)}
          className=""
          label={true}
          errorMessages={errorMessages.identifier}
        />
        <InputPattern 
          field="identifier"
          dict={fields.quantity.dict}
          defaultValue={String(result?.quantity)}
          className=""
          label={true}
          errorMessages={errorMessages.quantity}
        />
      </div>

      <div className="xl:grid-cols-2 gap-2">
        <div className="flex gap-2 pt-4">
          <div className="w-full">
            <InputPattern 
              field="width"
              dict={fields.width.dict}
              defaultValue={String(result?.width)}
              className=""
              label={true}
              errorMessages={errorMessages.width as string[]}
            />
            <InputPattern 
              field="length"
              dict={fields.length.dict}
              defaultValue={String(result?.length)}
              className=""
              label={true}
              errorMessages={errorMessages.length as string[]}
            />
            <InputPattern 
              field="height"
              dict={fields.height.dict}
              defaultValue={String(result?.height)}
              className=""
              label={true}
              errorMessages={errorMessages.height as string[]}
            />
          </div>
          <SelectUnit 
            base={result?.lengthUnit}
            field="length"
            list={fields.lengthUnit.list}
            dict={fields.lengthUnit.dict}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <div className="w-full">
            <InputPattern 
              field="weight"
              dict={fields.weight.dict}
              defaultValue={String(result?.weight)}
              className=""
              label={true}
              errorMessages={errorMessages.weight as string[]}
            />
          </div>
          <SelectUnit 
            base={result?.weightUnit}
            field="weight"
            list={fields.weightUnit.list}
            dict={fields.weightUnit.dict}
          />
        </div>
      </div>
    </div>

    <div className="mb-4 rounded ">
      <h3 className="font-semibold pb-2">{dict?.sections.position}</h3>
      <div className="xl:grid-cols-1 gap-2">
        <PositionSelectFieldWithAdd 
          fields={{ 
            zone: {
              select: fields.zoneWithAdd.selectField,
              formDialog: fields.zoneWithAdd.addDialog,
              errorMessages: errorMessages.zoneWithAdd, 
              defaultValue: defaultZone,
            },
            aisle: {
              select: fields.aisleWithAdd.selectField,
              formDialog: fields.aisleWithAdd.addDialog,
              errorMessages: errorMessages.aisleWithAdd,
              defaultValue: defaultAisle,
            },
            rack: {
              select: fields.rackWithAdd.selectField,
              formDialog: fields.rackWithAdd.addDialog,
              errorMessages: errorMessages.rackWithAdd,
              defaultValue: defaultRack,
            },
            shelf: {
              select: fields.shelfWithAdd.selectField,
              formDialog: fields.shelfWithAdd.addDialog,
              errorMessages: errorMessages.shelfWithAdd,
              defaultValue: defaultShelf,
            },
          }}
        />
      </div>
    </div>

    <div className="mb-4 rounded ">
      <h3 className="font-semibold pb-2">{dict?.sections.images}</h3>
      <div className="xl:grid-cols-1 gap-2">
        <InputPattern 
          field="images"
          dict={fields.images.dict}
          className=""
          label={true}
          errorMessages={errorMessages.images as string[]}
        />
      </div>
    </div>

    {
      // Here I need to add the variants data, so I'll need to handle
      // the useStates of the variantsJSON and the codesJSON here.
    }

    {
      //<div className="mb-4  w-full">
      //  <h3 className="font-semibold pb-2">{dict?.sections.images}</h3>
      //  <div className="xl:grid-cols-1 gap-2">
      //    <SheetAddVariant />
      //    here the list of the variants...
      //    With the different codes or a counter for the codes?
      //  </div>
      //</div>
    }

    <input 
      type="hidden" 
      name="variants" 
      value={fields.variantsJSON.data} />
    <input 
      type="hidden" 
      name="codes" 
      value={fields.codesJSON.data} />
    <input type="hidden" name="type" value="ItemComplete" />
  </>
)}
