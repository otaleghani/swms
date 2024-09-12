"use client";

/** Actions */
import { AddVariantFieldState, AddVariantFieldAction } from "./action";

/** Types */
import { Supplier, Variant, SupplierCode } from "@/app/lib/types";

/** React hooks */
import { useState, useEffect, useActionState } from "react";

/** Components */
import WidthInput from "../../general/form/input/width";
import HeightInput from "../../general/form/input/height";
import WeightInput from "../../general/form/input/weight";
import LengthInput from "../../general/form/input/length";
import NameInput from "../../general/form/input/name";
import DescriptionInput from "../../general/form/input/description";
import IdentifierInput from "../../general/form/input/identifier";
import SubmitButton from "../../general/form/button/submit";
import QuantityInput from "../../general/form/input/quantity";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/button";
import { CirclePlusIcon, DeleteIcon, EditIcon, Trash2 } from "lucide-react";
import AddCodeVariant from "../../suppliers-codes/add_new_variant_form/field";
import { Separator } from "@/components/separator";
import { EditSupplierCodeVariantDialog } from "../../suppliers-codes/edit_variant/dialog";
import { DeleteCodeVariantDialog } from "../../suppliers-codes/delete_variant/dialog";

interface AddVariantSheetProps {
  locale: string;

  dict_general_fields: any;

  dict_variant_add_form: any;
  // dict_variant_delete_dialog: any;
  // dict_variant_edit_dialog: any;
  dict_supplier_add_dialog: any;
  dict_supplier_code_delete_dialog: any;
  dict_supplier_code_edit_dialog: any;

  suppliers: Supplier[];

  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  setCodes: React.Dispatch<React.SetStateAction<SupplierCode[]>>;
}

export default function VariantAddSheet({
  locale,

  dict_general_fields,
  dict_variant_add_form,
  dict_supplier_add_dialog,
  dict_supplier_code_delete_dialog,
  dict_supplier_code_edit_dialog,

  suppliers,
  setVariants,
  setCodes
}: AddVariantSheetProps) {
  const formName = "variants";
  const initialState: AddVariantFieldState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
      identifier: [],
      quantity: [],
      width: [],
      height: [],
      length: [],
      weight: [],
      item: [],
    },
    message: "",
  }

  const [currentCodes, setCurrentCodes] = useState([] as SupplierCode[]);
  const [state, action, isPending] = 
    useActionState(AddVariantFieldAction, initialState);

  useEffect(() => {
    // Fires this only after getting a successful form post
    if (state.error !== true && state.result !== undefined) {

      // Creates a temporary Id, used to retrive variant and the 
      // codes associated with it in an edit or delete scenario
      let tempId = String(Math.random().toString(36).padEnd(8, '0'));
      state.result.variant.id = tempId;
      setVariants(prev => [...prev, state.result?.variant as Variant]);

      currentCodes.map(code => {code.variant = tempId})
      setCodes(prev => [...prev, ...currentCodes]);

      // Clears the current codes
      setCurrentCodes([]);
    }
  }, [state])

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Button className="" variant="ghost" asChild>
          <div className="w-full flex align-start">
            <CirclePlusIcon className="h-[1.2rem] w-[1.2rem] mr-2"/>
            <span>{dict_variant_add_form.header.title}</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-100 w-[100%] p-0">
        <SheetHeader className="p-4 bg-gray-50">
          <SheetTitle className="text-left text-sm">
            {dict_variant_add_form.header.title}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea
          className="h-[calc(100dvh_-_57px)] overflow-auto p-4"
          type="always"
        >
          <form action={action} id={formName}> 
            <div className="grid gap-2 p-5 bg-white rounded my-2">
              <NameInput 
                dict={dict_general_fields.fields.name}
                className=""
                error_messages={state.errorMessages.name}
              />
              <DescriptionInput 
                dict={dict_general_fields.fields.description}
                className=""
                error_messages={state.errorMessages.description}
              />
            </div>
            <div className="grid xl:grid-cols-1 gap-2 p-5 bg-white rounded my-2">
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
            <div className="grid xl:grid-cols-1 gap-2 p-5 bg-white rounded my-2">
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
            <input type="hidden" name="locale" value={locale} />
          </form>
          <div className="grid gap-2 p-5 bg-white rounded my-2">
            <h3 className="font-semibold">Codici fornitori</h3>
            <AddCodeVariant
              locale={locale}
              suppliers={suppliers}
              dict_add_dialog={dict_supplier_add_dialog}
              dict_form_fields={dict_general_fields}
              setCodes={setCurrentCodes}
            />
            {currentCodes.map((code: SupplierCode) => (
              <>
                <Separator className="my-2" />
                <div className="text-sm grid grid-cols-3 items-center">
                  <div className="truncate">
                    {code.code}
                  </div>
                  <div className="truncate">
                    {suppliers.find(obj => obj.id == code.supplier)?.name}
                  </div>
                  <div className="flex justify-end gap-1">
                    <EditSupplierCodeVariantDialog 
                      locale={locale}
                      dict={dict_supplier_code_edit_dialog}
                      dict_form_fields={dict_general_fields}
                      dict_add_dialog={dict_supplier_add_dialog}
                      code={code}
                      codes={currentCodes}
                      supplier={
                        suppliers.find(obj => obj.id == code.supplier) as Supplier
                      }
                      suppliers={suppliers}
                      setCodes={setCurrentCodes}
                    />
                    <DeleteCodeVariantDialog 
                      dict={dict_supplier_code_delete_dialog}
                      locale={locale}
                      code={code}
                      codes={currentCodes}
                      setCodes={setCurrentCodes}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="grid gap-2 my-2">
            <SubmitButton 
              dict={dict_general_fields.buttons.add}
              isPending={isPending}
              className="pt-4"
              form={formName}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
