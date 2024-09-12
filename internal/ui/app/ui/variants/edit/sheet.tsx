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

interface EditVariantSheetProps {
  locale: string;

  dict_form_fields: any;
  dict_variant_edit_dialog: any;
  dict_supplier_add_dialog: any;
  dict_supplier_code_delete_dialog: any;
  dict_supplier_code_edit_dialog: any;

  suppliers: Supplier[];

  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  setCodes: React.Dispatch<React.SetStateAction<SupplierCode[]>>;

  variant: Variant;
  codes: SupplierCode[];
}

export default function VariantEditSheet({
  locale,

  dict_form_fields,
  dict_variant_edit_dialog,
  dict_supplier_add_dialog,
  dict_supplier_code_delete_dialog,
  dict_supplier_code_edit_dialog,

  suppliers,
  setVariants,
  setCodes,

  variant,
  codes,
}: EditVariantSheetProps) {
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

  const [currentCodes, setCurrentCodes] = useState(codes as SupplierCode[]);
  const [state, action, isPending] = 
    useActionState(AddVariantFieldAction, initialState);

  useEffect(() => {
    // Fires this only after getting a successful form post
    if (state.error !== true && state.result !== undefined) {

      state.result.variant.id = variant.id;
      let result = state.result.variant as Variant
      setVariants(prev => 
        prev.map(item => 
          item === variant ? result : item
        )
      );

      setCodes(prev => prev.filter(item => item.variant !== variant.id));
      currentCodes.map(code => {code.variant = variant.id as string})
      setCodes(prev => [...prev, ...currentCodes]);
    }
  }, [state])

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Button className="" variant="ghost" asChild>
          <Button variant="outline" className="p-0 w-8 h-8">
            <EditIcon className="w-[1.2rem] h-[1.2rem]"/>
          </Button>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-100 w-[100%] p-0">
        <SheetHeader className="p-4 bg-gray-50">
          <SheetTitle className="text-left text-sm">
            {dict_variant_edit_dialog.header.title}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea
          className="h-[calc(100dvh_-_57px)] overflow-auto p-4"
          type="always"
        >
          <form action={action} id={formName}> 
            <div className="grid gap-2 p-5 bg-white rounded my-2">
              <NameInput 
                value={variant.name}
                dict={dict_form_fields.fields.name}
                className=""
                error_messages={state.errorMessages.name}
              />
              <DescriptionInput 
                value={variant.description}
                dict={dict_form_fields.fields.description}
                className=""
                error_messages={state.errorMessages.description}
              />
            </div>
            <div className="grid xl:grid-cols-1 gap-2 p-5 bg-white rounded my-2">
              <IdentifierInput 
                value={variant.identifier}
                dict={dict_form_fields.fields.identifier}
                className=""
                error_messages={state.errorMessages.identifier}
              />
              <QuantityInput
                value={variant.quantity}
                dict={dict_form_fields.fields.quantity}
                className=""
                error_messages={state.errorMessages.quantity}
              />
            </div>
            <div className="grid xl:grid-cols-1 gap-2 p-5 bg-white rounded my-2">
              <WidthInput 
                value={variant.width}
                dict={dict_form_fields.fields.width}
                className=""
                error_messages={state.errorMessages.width}
              />
              <LengthInput 
                value={variant.length}
                dict={dict_form_fields.fields.length}
                className=""
                error_messages={state.errorMessages.length}
              />
              <HeightInput 
                value={variant.heigth}
                dict={dict_form_fields.fields.height}
                className=""
                error_messages={state.errorMessages.height}
              />
              <WeightInput 
                value={variant.weight}
                dict={dict_form_fields.fields.weight}
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
              dict_form_fields={dict_form_fields}
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
                      dict_form_fields={dict_form_fields}
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
              dict={dict_form_fields.buttons.add}
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
