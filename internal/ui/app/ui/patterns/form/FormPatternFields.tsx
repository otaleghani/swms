import InputPattern from "./input/InputPattern";
import PositionSelectField from "../../modules/positions/PositionSelectField";
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";
import PositionSelectFieldWithAdd from "../../modules/positions/PositionSelectFieldWithAdd";
import TagsSelectFieldsWithAdd from "../../modules/tags/TagsSelectFieldsWithAdd";

export const ZoneFormFields = ({
  fields,
  errorMessages,
  result
}: FormFieldsPropsWithDictCompleteMap["Zone"]) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
  </>
)}

export const AisleFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Aisle"]) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        }
      }}
    />
  </>
)}

export const RackFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Rack"]) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
        aisle: {
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        }
      }}
    />
  </>
)}

export const ShelfFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Shelf"]) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
        aisle: {
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        },
        rack: {
          select: fields.rack,
          errorMessages: errorMessages.rack,
        }
      }}
    />
  </>
)}

export const ZonesBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["ZonesBulk"]) => { return (
  <>
    <InputPattern 
      field="quantityWithButtons"
      dict={fields.quantity.dict}
      defaultValue={String(result?.number)}
      className=""
      label={true}
      errorMessages={errorMessages.number}
    />
  </>
)}

export const AislesBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["AislesBulk"]) => { return (
  <>
    <InputPattern 
      field="quantityWithButtons"
      dict={fields.quantity.dict}
      defaultValue={String(result?.number)}
      className=""
      label={true}
      errorMessages={errorMessages.number}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
      }}
    />
  </>
)}

export const RacksBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["RacksBulk"]) => { return (
  <>
    <InputPattern 
      field="quantityWithButtons"
      dict={fields.quantity.dict}
      defaultValue={String(result?.number)}
      className=""
      label={true}
      errorMessages={errorMessages.number}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
        aisle: {
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        },
      }}
    />
  </>
)}

export const ShelfsBulkFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["ShelfsBulk"]) => { return (
  <>
    <InputPattern 
      field="quantityWithButtons"
      dict={fields.quantity.dict}
      defaultValue={String(result?.number)}
      className=""
      label={true}
      errorMessages={errorMessages.number}
    />
    <PositionSelectField 
      fields={{ 
        zone: {
          select: fields.zone,
          errorMessages: errorMessages.zone,
        },
        aisle: {
          select: fields.aisle,
          errorMessages: errorMessages.aisle,
        },
        rack: {
          select: fields.rack,
          errorMessages: errorMessages.rack,
        },
      }}
    />
  </>
)}

export const ItemCompleteFormFields = ({
  fields,
  result,
  errorMessages,
  dict,
  codesJSON,
  variantsJSON
}: FormFieldsPropsWithDictCompleteMap["ItemComplete"] & { 
  codesJSON: string;
  variantsJSON: string;
}) => { return (
  <>
    <div className="mb-4 bg-white rounded p-5">
      <h3 className="font-semibold pb-2">{dict?.sections.basics}</h3>
      <div className="xl:grid-cols-4 gap-2">
        <InputPattern 
          field="name"
          dict={fields.name.dict}
          defaultValue={String(result?.name)}
          className=""
          label={true}
          errorMessages={errorMessages.name}
        />
        <InputPattern 
          field="description"
          dict={fields.description.dict}
          defaultValue={String(result?.description)}
          className=""
          label={true}
          errorMessages={errorMessages.description as string[]}
        />
        <TagsSelectFieldsWithAdd 
          fields={{
            category: {
              select: fields.categoryWithAdd.selectField,
              formDialog: fields.categoryWithAdd.addDialog,
              errorMessages: errorMessages.category as string[],
            },
            subcategory: {
              select: fields.subcategoryWithAdd.selectField,
              formDialog: fields.subcategoryWithAdd.addDialog,
              errorMessages: errorMessages.subcategory as string[],
            },
          }}
        />
      </div>
    </div>

    <div className="mb-4 bg-white rounded p-5">
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
          dict={fields.heigth.dict}
          defaultValue={String(result?.heigth)}
          className=""
          label={true}
          errorMessages={errorMessages.heigth as string[]}
        />
        <InputPattern 
          field="weight"
          dict={fields.weight.dict}
          defaultValue={String(result?.weight)}
          className=""
          label={true}
          errorMessages={errorMessages.weight as string[]}
        />
      </div>
    </div>

    <div className="mb-4 bg-white rounded p-5">
      <h3 className="font-semibold pb-2">{dict?.sections.position}</h3>
      <div className="xl:grid-cols-1 gap-2">
        <PositionSelectFieldWithAdd 
          fields={{ 
            zone: {
              select: fields.zoneWithAdd.selectField,
              formDialog: fields.zoneWithAdd.addDialog,
              errorMessages: errorMessages.zone as string[],
            },
            aisle: {
              select: fields.aisleWithAdd.selectField,
              formDialog: fields.aisleWithAdd.addDialog,
              errorMessages: errorMessages.aisle as string[],
            },
            rack: {
              select: fields.rackWithAdd.selectField,
              formDialog: fields.rackWithAdd.addDialog,
              errorMessages: errorMessages.rack as string[],
            },
            shelf: {
              select: fields.shelfWithAdd.selectField,
              formDialog: fields.shelfWithAdd.addDialog,
              errorMessages: errorMessages.shelf as string[],
            },
          }}
        />
      </div>
    </div>

    <div className="mb-4 bg-white rounded p-5">
      <h3 className="font-semibold pb-2">{dict?.sections.position}</h3>
      <div className="xl:grid-cols-1 gap-2">
        <InputPattern 
          field="images"
          dict={fields.images.dict}
          //defaultValue={String(result?.weight)}
          className=""
          label={true}
          errorMessages={errorMessages.images as string[]}
        />
      </div>
    </div>

    <input type="hidden" name="variants" value={variantsJSON} />
    <input type="hidden" name="variants" value={codesJSON} />
  </>
)}

export const VariantsFormFields = ({
  fields,
  result,
  errorMessages,
  dict,
  codesJSON,
}: FormFieldsPropsWithDictCompleteMap["Variant"] & { 
  codesJSON?: string;
}) => { return (
  <>
    <div className="mb-4 bg-white rounded p-5">
      <h3 className="font-semibold pb-2">{dict?.sections.basics}</h3>
      <div className="grid xl:grid-cols-1 gap-2">
        <InputPattern 
          field="name"
          dict={fields.name.dict}
          defaultValue={String(result?.name)}
          className=""
          label={true}
          errorMessages={errorMessages.name}
        />
        <InputPattern 
          field="description"
          dict={fields.description.dict}
          defaultValue={String(result?.description)}
          className=""
          label={true}
          errorMessages={errorMessages.description as string[]}
        />
        <InputPattern 
          field="identifier"
          dict={fields.identifier.dict}
          defaultValue={String(result?.identifier)}
          className=""
          label={true}
          errorMessages={errorMessages.identifier as string[]}
        />
        <InputPattern 
          field="quantity"
          dict={fields.quantity.dict}
          defaultValue={String(result?.quantity)}
          className=""
          label={true}
          errorMessages={errorMessages.quantity as string[]}
        />
      </div>
    </div>

    <div className="mb-4 bg-white rounded p-5">
      <h3 className="font-semibold pb-2">{dict?.sections.dimensions}</h3>
      <div className="grid xl:grid-cols-1 gap-2">
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
          dict={fields.heigth.dict}
          defaultValue={String(result?.heigth)}
          className=""
          label={true}
          errorMessages={errorMessages.heigth as string[]}
        />
        <InputPattern 
          field="weight"
          dict={fields.weight.dict}
          defaultValue={String(result?.weight)}
          className=""
          label={true}
          errorMessages={errorMessages.weight as string[]}
        />
      </div>
    </div>

    {
      //<input type="hidden" name="variants" value={codesJSON} />
    }
  </>
)}

export const CategoryFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Category"] ) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description as string[]}
    />
  </>
)}

export const SubcategoryFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Subcategory"] ) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description as string[]}
    />
    <TagsSelectFieldsWithAdd 
      fields={{
        category: {
          select: fields.categoryWithAdd.selectField,
          formDialog: fields.categoryWithAdd.addDialog,
          errorMessages: errorMessages.category as string[],
        },
      }}
    />
  </>
)}

export const ProductFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Product"] ) => { return (
  <>
    <InputPattern 
      field="name"
      dict={fields.name.dict}
      defaultValue={result?.name}
      className=""
      label={true}
      errorMessages={errorMessages.name}
    />
    <InputPattern 
      field="description"
      dict={fields.description.dict}
      defaultValue={result?.description}
      className=""
      label={true}
      errorMessages={errorMessages.description as string[]}
    />
  </>
)}
