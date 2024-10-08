"use client";

/** React hooks */
import { useActionState, useEffect } from "react";

/** Next hooks */
import { usePathname } from "next/navigation";

/** Local components */
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";
import FormSuccessPattern from "@/app/ui/patterns/form/FormSuccessPattern";
import FormErrorPattern from "@/app/ui/patterns/form/FormErrorPatter";
import * as FormFields from "./FormPatternFields";

/** Types and interfaces */
import { FormPropsMap } from "@/app/lib/types/form/form";

import { 
  ZoneFormFieldsProps,
  AisleFormFieldsProps,
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
  TransactionFormFieldsProps,
  UserFormFieldsProps,
} from "@/app/lib/types/form/fields";
import { AcceptedLocales } from "@/app/lib/types/misc";

export default function FormPattern<K extends keyof FormPropsMap>({
  self,
  form,
  type,
  showButton,
}: FormPropsMap[K] & { showButton?: boolean }) {
  let locale = usePathname().split("/")[1] as AcceptedLocales;
  const [state, action, isPending] = useActionState(
    form.formAction,
    form.initialState,
  );

  useEffect(() => {
    if (!state.error && state.result) {
      if (form.notifyFormSent) {
        form.notifyFormSent(false);
        if (form.refreshItemList) {
          form.refreshItemList(state.result);
        }
      }
    }
  }, [state])

  return (
    <form id={form.formName} action={action}>
      <div className="grid gap-4 py-4">

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
          />
        )}

        { type === "Client" && (
          <FormFields.Client
            fields={self.fields as ClientFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Client"]]: string[]}}
          />
        )}
        { type === "Product" && (
          <FormFields.Product
            fields={self.fields as ProductFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Product"]]: string[]}}
          />
        )}
        { type === "ProductImage" && (
          <FormFields.ProductImages
            fields={self.fields as ProductImageFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ProductImage"]]: string[]}}
          />
        )}

        { type === "Ticket" && (
          <FormFields.Ticket
            fields={self.fields as TicketFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Ticket"]]: string[]}}
            locale={locale}
          />
        )}
        { type === "TicketState" && (
          <FormFields.TicketState
            fields={self.fields as TicketStateFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["TicketState"]]: string[]}}
          />
        )}
        { type === "TicketType" && (
          <FormFields.TicketType
            fields={self.fields as TicketTypeFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["TicketType"]]: string[]}}
          />
        )}

        { type === "Supplier" && (
          <FormFields.Supplier
            fields={self.fields as SupplierFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Supplier"]]: string[]}}
          />
        )}
        { type === "SupplierCode" && (
          <FormFields.SupplierCode
            fields={self.fields as SupplierCodeFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["SupplierCode"]]: string[]}}
          />
        )}

        { type === "ItemComplete" && (
          <FormFields.ItemComplete
            fields={self.fields as ItemCompleteFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ItemComplete"]]: string[]}}
          />
        )}
        { type === "Variant" && (
          <FormFields.Variants
            fields={self.fields as VariantFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Variant"]]: string[]}}
          />
        )}
        { type === "Transaction" && (
          <FormFields.Transaction
            fields={self.fields as TransactionFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Transaction"]]: string[]}}
          />
        )}
        { type === "User" && (
          <FormFields.User
            fields={self.fields as UserFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["User"]]: string[]}}
          />
        )}

        { showButton && (
          <SubmitFormButtonPattern 
            formName={form.formName}
            isPending={isPending}
            className=""
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
