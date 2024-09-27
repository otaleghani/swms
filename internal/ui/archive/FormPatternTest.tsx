"use client";

/** React hooks */
import { createElement, useActionState, useEffect } from "react";

/** Next hooks */
import { usePathname } from "next/navigation";

/** Local components */
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";

/** Types and interfaces */
import FormSuccessPattern from "@/app/ui/patterns/form/FormSuccessPattern";
import FormErrorPattern from "@/app/ui/patterns/form/FormErrorPatter";

import { 
  ListFormProps ,
  ZoneForm,
  AisleFormFields
} from "./FormPatternFields";

import { AisleFormProps } from "@/app/lib/types/data/aisles";
import { ZoneFormProps } from "@/app/lib/types/data/zones";

export default function FormPattern<K extends keyof ListFormProps>({
  props,
}: ListFormProps[K]) {
  const locale = usePathname().split("/")[1];
  const [state, action, isPending] = useActionState(
    props.form.formAction,
    props.form.initialState,
  );

  useEffect(() => {
    if (!state.error && state.result) {
      if (props.form.notifyFormSent) {
        props.form.notifyFormSent(true);
        if (props.form.refreshItemList) {
          props.form.refreshItemList(state.result);
        }
      }
    }
  }, [state])

  return (
    <form id={props.form.formName} action={action}>
      <div className="grid gap-4 py-4">
        { props.type === "Aisle" && (
          <AisleFormFields
            {...props.self.fields}
            name={{
              ...props.self.fields.name,
              errorMessages: state.errorMessages.name,
              defaultValue: state.result?.name,
            }}
          />
        )}
        { props.type === "Zone" && (
          <ZoneForm
            props={props as ZoneFormProps}
          />
        )}
        <SubmitFormButtonPattern 
          formName={props.form.formName}
          isPending={isPending}
          className=""
          dict={props.self.dict.button}
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
