import PositionSelectField from "@/app/ui/modules/positions/PositionSelectField";
import TagsSelectFields from "@/app/ui/modules/tags/TagsSelectField";

/** Types and interfaces */
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";
import SelectFieldPattern from "../select/SelectFieldPattern";
import SelectSupplierField from "@/app/ui/modules/suppliers/select/SelectSupplierField";

export const ReplaceFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Replace"]) => {

  return (
    <>
      { result?.type === "Zone" && 
        fields.zone && (
          <div>
            <input type="hidden" name="itemToDelete" value={fields.id} />
            <PositionSelectField 
              fields={{
                zone: {
                  select: fields.zone,
                  errorMessages: errorMessages.zone,
                  type: "itemThatReplaces",
                }
              }}
            />
          </div>
      )}

      { result?.type === "Aisle" && 
        fields.aisle && 
        fields.zone && (
          <div>
            <input type="hidden" name="itemToDelete" value={fields.id} />
            <PositionSelectField 
              fields={{
                zone: {
                  select: fields.zone,
                  errorMessages: errorMessages.zone,
                },
                aisle: {
                  select: fields.aisle,
                  errorMessages: errorMessages.aisle,
                  type: "itemThatReplaces"
                }
              }}
            />
          </div>
      )}

      { result?.type === "Rack" && 
        fields.rack && 
        fields.aisle && 
        fields.zone && (
        <div>
          <input type="hidden" name="itemToDelete" value={fields.id} />
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
                type: "itemThatReplaces"
              }
            }}
          />
          </div>
      )}

      { result?.type === "Shelf" && 
        fields.shelf && 
        fields.rack && 
        fields.aisle && 
        fields.zone && (
          <div>
            <input type="hidden" name="itemToDelete" value={fields.id} />
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
                shelf: {
                  select: fields.shelf,
                  errorMessages: errorMessages.shelf,
                  type: "itemThatReplaces"
                }
              }}
            />
          </div>
      )}

      { result?.type === "Category" && 
        fields.category && (
          <div>
            <input type="hidden" name="itemToDelete" value={fields.id} />
            <TagsSelectFields 
              fields={{
                category: {
                  select: fields.category,
                  errorMessages: errorMessages.category,
                  type: "itemThatReplaces"
                },
              }}
            />
          </div>
      )}

      { result?.type === "Subcategory" && 
        fields.subcategory &&
        fields.category && (
          <div>
            <input type="hidden" name="itemToDelete" value={fields.id} />
            <TagsSelectFields 
              fields={{
                category: {
                  select: fields.category,
                  errorMessages: errorMessages.category,
                },
                subcategory: {
                  select: fields.subcategory,
                  errorMessages: errorMessages.subcategory,
                  type: "itemThatReplaces"
                },
              }}
            />
          </div>
      )}

      { result?.type === "Supplier" && 
        fields.supplier && (
          <div>
            <input type="hidden" name="itemToDelete" value={fields.id} />
            <SelectSupplierField 
              fields={{
                supplier: {
                  select: fields.supplier,
                  errorMessages: errorMessages.supplier,
                  type: "itemThatReplaces"
                }
              }}
            />
          </div>
      )}
    </>
  )
}
