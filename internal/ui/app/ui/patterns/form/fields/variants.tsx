/** Local components */
import InputPattern from "../input/InputPattern";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const VariantsFormFields = ({
  fields,
  result,
  errorMessages,
  dict,
}: FormFieldsPropsWithDictCompleteMap["Variant"]) => { 
  return (
    <>
      <div className="mb-4 bg-white rounded">
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

      <div className="mb-4 bg-white rounded">
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
            dict={fields.height.dict}
            defaultValue={String(result?.height)}
            className=""
            label={true}
            errorMessages={errorMessages.height as string[]}
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
      <input type="hidden" name="type" value="Variant" />
    </>
)}
