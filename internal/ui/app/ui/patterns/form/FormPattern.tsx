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
  AisleFormFields 
} from "./FormPatternFields";

/** Types and interfaces */
import { 
  FormPropsMap,
} from "@/app/lib/types/form/form";

import { 
  ZoneFormFieldsProps,
  AisleFormFieldsProps,
} from "@/app/lib/types/form/fields";

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
      //console.log(form.formName)
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
            fields={{
              ...self.fields, 
              name: {
                dict: self.fields.name.dict,
                defaultValue: state.result?.name,
                errorMessages: state.errorMessages.name,
              },
            } as ZoneFormFieldsProps}
          />
        )}
        { type === "Aisle" && (
          <AisleFormFields
            fields={{
              ...self.fields,
              name: {
                ...self.fields.name,
                errorMessages: state.errorMessages.name,
                defaultValue: state.result?.name,
              },
              zone: {
                ...self.fields.zone,
                SelectField: {
                  ...self.fields.zone?.SelectField,
                  errorMessages: state.errorMessages.zone,
                  defaultValue: state.result?.zone,
                }
              }
            } as AisleFormFieldsProps}
            //dict={{...self.dict}}
          />
        )}
        <SubmitFormButtonPattern 
          formName={form.formName}
          isPending={isPending}
          className=""
          dict={self.fields.button}
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
