"use client";

/** React hooks */
import { useActionState, useEffect } from "react";

/** Next hooks */
import { usePathname } from "next/navigation";

/** Local components */
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";
import FormSuccessPattern from "@/app/ui/patterns/form/FormSuccessPattern";
import FormErrorPattern from "@/app/ui/patterns/form/FormErrorPatter";
import { 
  ZoneFormFields,
  //AisleFormFields, 
  ZonesBulkFormFields,
  //AislesBulkFormFields
  ProductFormFields,
  ClientFormFields
} from "./FormPatternFields";

/** Types and interfaces */
import { 
  FormPropsMap,
} from "@/app/lib/types/form/form";

import { 
  ZoneFormFieldsProps,
  AisleFormFieldsProps,
  ZonesBulkFormFieldsProps,
  AislesBulkFormFieldsProps,
  ProductFormFieldsProps,
  ClientFormFieldsProps,
  FormFieldsPropsMap,
} from "@/app/lib/types/form/fields";
import { FormMap } from "@/app/lib/types/form/form";

export default function FormPattern<K extends keyof FormPropsMap>({
  self,
  form,
  type
}: FormPropsMap[K]) {
  const locale = usePathname().split("/")[1];
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
          <ZoneFormFields
            fields={self.fields as ZoneFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Zone"]]: string[]}}
            result={state.result}
          />
        )}

        {
        //{ type === "Aisle" && (

        //  <AisleFormFields
        //    fields={self.fields as AisleFormFieldsProps}
        //    errorMessages={state.errorMessages as {
        //      [T in keyof FormMap["Aisle"]]: string[]}}
        //    result={state.result}
        //  />
        //)}
        }

        { type === "ZonesBulk" && (
          <ZonesBulkFormFields
            fields={self.fields as ZonesBulkFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["ZonesBulk"]]: string[]}}
            result={state.result}
          />
        )}

        {
        //{ type === "AislesBulk" && (
        //  <AislesBulkFormFields
        //    fields={self.fields as AislesBulkFormFieldsProps}
        //    errorMessages={state.errorMessages as {
        //      [T in keyof FormMap["AislesBulk"]]: string[]}}
        //    result={state.result}
        //  />
        //)}
        }

        { type === "Product" && (
          <ProductFormFields
            fields={self.fields as ProductFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Product"]]: string[];
            } & {
              images: string[]
            }}
            result={state.result}
          />
        )}

        { type === "Client" && (
          <ClientFormFields
            fields={self.fields as ClientFormFieldsProps}
            errorMessages={state.errorMessages as {
              [T in keyof FormFieldsPropsMap["Client"]]: string[];
            }}
            result={state.result}
          />

        )}

        <SubmitFormButtonPattern 
          formName={form.formName}
          isPending={isPending}
          className=""
          dict={self.fields?.button}
        />
        <input type="hidden" name="locale" value={locale} />
        {!state.error
          ? (<FormSuccessPattern message={state.message}/>)
          : (<FormErrorPattern message={state.message} />)
        }
      </div>
    </form>
  )
}
