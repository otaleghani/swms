"use client";

/** React hooks */
import { useLocale } from "@/app/lib/hooks/useLocale";
import { useActionState, useEffect, useState } from "react";

/** Local components */
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";
import FormSuccessPattern from "@/app/ui/patterns/form/FormSuccessPattern";
import FormErrorPattern from "@/app/ui/patterns/form/FormErrorPatter";
import * as FormFields from "./FormPatternFields";

/** Types and interfaces */
import { FormPropsMap } from "@/app/lib/types/form/form";

import { 
  ZoneFormFieldsProps, AisleFormFieldsProps,
  ZonesBulkFormFieldsProps,
  AislesBulkFormFieldsProps,
  ProductFormFieldsProps,
  ClientFormFieldsProps,
  FormFieldsPropsMap,
  RackFormFieldsProps,
  RacksBulkFormFieldsProps,
  ShelfFormFieldsProps,
  ShelfsBulkFormFieldsProps,
  CategoryFormFieldsProps,
  SubcategoryFormFieldsProps,
  ProductImageFormFieldsProps,
  TicketFormFieldsProps,
  TicketStateFormFieldsProps,
  TicketTypeFormFieldsProps,
  SupplierFormFieldsProps,
  SupplierCodeFormFieldsProps,
  ItemCompleteFormFieldsProps,
  VariantFormFieldsProps,
  OperationFormFieldsProps,
  UserFormFieldsProps,
  ReplaceFormFieldsProps,
  LoginFormFieldsProps,
  RegisterFormFieldsProps,
  DictItemsForm,
} from "@/app/lib/types/form/fields";

export default function FormPattern<K extends keyof FormPropsMap>({
  self,
  form,
  type,
  showButton,
}: FormPropsMap[K] & { showButton?: boolean }) {
  const { locale } = useLocale();
  const [state, action, isPending] = useActionState(
    form.formAction,
    form.initialState,
  );
  const [result, setResult] = useState(form.initialState.result)

  useEffect(() => {
    /** 
    * @todo Find a way to stop the complete re-render of this element in 
    * DialogFormPattern.
    *
    * This issue was resolved, so this piece of the code should be
    * deleted before the first release.
    * */
    if (!state.error && state.result && state.message) {
      if (form.notifyFormSent) {
        form.notifyFormSent(false);
        if (form.refreshItemList) {
          form.refreshItemList(state.result);
        }
      }
    }
  }, [state])

  return (
    <form 
      id={form.formName} 
      action={action}
      name={form.formName}
    >
      <div className="grid gap-2 py-4">

        {type === "Login" && (
          <FormFields.Login 
            fields={self.fields as LoginFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Login"]]: string[]}}
            result={state.result}
          />
        )}

        {type === "Register" && (
          <FormFields.Register 
            fields={self.fields as RegisterFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Register"]]: string[]}}
            result={state.result}
          />
        )}

        {type === "Replace" && (
          <FormFields.Replace
            fields={self.fields as ReplaceFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Replace"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Delete" && (
          <>
            <input type="hidden" name="id" value={state.result?.id} />
            <input type="hidden" name="type" value={state.result?.type} />
          </>
        )}

        { type === "Zone" && (
          <FormFields.Zone
            fields={self.fields as ZoneFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Zone"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "ZonesBulk" && (
          <FormFields.ZonesBulk
            fields={self.fields as ZonesBulkFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ZonesBulk"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Aisle" && (
          <FormFields.Aisle
            fields={self.fields as AisleFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Aisle"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "AislesBulk" && (
          <FormFields.AislesBulk
            fields={self.fields as AislesBulkFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["AislesBulk"]]: string[]}}
            result={{
              ...state.result,
              locale: "it",
              type: "AislesBulk",
            }}
          />
        )}

        { type === "Rack" && (
          <FormFields.Rack
            fields={self.fields as RackFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Rack"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "RacksBulk" && (
          <FormFields.RacksBulk
            fields={self.fields as RacksBulkFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["RacksBulk"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Shelf" && (
          <FormFields.Shelf
            fields={self.fields as ShelfFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Shelf"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "ShelfsBulk" && (
          <FormFields.ShelfsBulk
            fields={self.fields as ShelfsBulkFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ShelfsBulk"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Category" && (
          <FormFields.Category
            fields={self.fields as CategoryFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Category"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "Subcategory" && (
          <FormFields.Subcategory
            fields={self.fields as SubcategoryFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Subcategory"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Client" && (
          <FormFields.Client
            fields={self.fields as ClientFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Client"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "Product" && (
          <FormFields.Product
            fields={self.fields as ProductFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Product"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "ProductImage" && (
          <FormFields.ProductImages
            fields={self.fields as ProductImageFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ProductImage"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Ticket" && (
          <FormFields.Ticket
            fields={self.fields as TicketFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Ticket"]]: string[]}}
            result={state.result}
            locale={locale}
          />
        )}
        { type === "TicketState" && (
          <FormFields.TicketState
            fields={self.fields as TicketStateFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["TicketState"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "TicketType" && (
          <FormFields.TicketType
            fields={self.fields as TicketTypeFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["TicketType"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "Supplier" && (
          <FormFields.Supplier
            fields={self.fields as SupplierFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Supplier"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "SupplierCode" && (
          <FormFields.SupplierCode
            fields={self.fields as SupplierCodeFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["SupplierCode"]]: string[]}}
            result={state.result}
          />
        )}

        { type === "ItemComplete" && (
          <FormFields.ItemComplete
            result={result as any}
            setResult={setResult as any}
            fields={self.fields as ItemCompleteFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ItemComplete"]]: string[]}}
            dict={self.dict as DictItemsForm}
          />
        )}
        { type === "Variant" && (
          <FormFields.Variants
            fields={self.fields as VariantFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Variant"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "Operation" && (
          <FormFields.Operation
            fields={self.fields as OperationFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Operation"]]: string[]}}
            result={state.result}
          />
        )}
        { type === "User" && (
          <FormFields.User
            fields={self.fields as UserFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["User"]]: string[]}}
            result={state.result}
          />
        )}

        { showButton && (
          <SubmitFormButtonPattern 
            formName={form.formName}
            isPending={isPending}
            className="mt-4"
            dict={self.fields?.button}
          />
        )}
        <input type="hidden" name="locale" value={locale} />
        {!state.error
          ? (<FormSuccessPattern message={state.message}/>)
          : (<FormErrorPattern message={state.message} />)
        }
      </div>
    </form>
  )
}
