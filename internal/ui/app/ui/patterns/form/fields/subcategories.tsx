/** Local components */
import InputPattern from "../input/InputPattern";
import TagsSelectFields from "@/app/ui/modules/tags/TagsSelectField";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const SubcategoryFormFields = ({
  fields,
  result,
  errorMessages,
}: FormFieldsPropsWithDictCompleteMap["Subcategory"] ) => { 

  let defaultCategory = result?.category ? 
    fields.category.list.find(i => i.id === result.category) : undefined;

  return (
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
      <TagsSelectFields
        fields={{
          category: {
            select: fields.category,
            defaultValue: defaultCategory,
            errorMessages: errorMessages.category as string[],
          },
        }}
      />
      <input type="hidden" name="type" value="Subcategory" />
    </>
  )
}

