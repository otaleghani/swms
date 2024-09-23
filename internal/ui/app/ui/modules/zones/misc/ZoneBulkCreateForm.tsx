"use client";

/** React hooks */
import { useActionState, useEffect } from "react";

/** Next hooks */
import { usePathname } from "next/navigation";

/** Local components */
import InputPattern from "@/app/ui/patterns/form/input/InputPattern";
import { FormProps } from "@/app/lib/types/misc";
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";

/** Types and interfaces */
import { 
  Zone,
  ZonesBulkPostRequestBody, 
} from "@/app/lib/types/data/zones";

import { 
  DictInputField,
  DictFormButton,
} from "@/app/lib/types/dictionary/form";
import FormSuccessPattern from "@/app/ui/patterns/form/FormSuccessPattern";

export interface DictZoneForm {
  number: DictInputField;
  button: DictFormButton;
}

export interface ZoneFormProps {
  form: FormProps<ZonesBulkPostRequestBody>;
  dict: DictZoneForm;
}

export default function ZoneBulkForm({
  form,
  dict,
}: ZoneFormProps) {
  const locale = usePathname().split("/")[1];
  const [state, action, isPending] = useActionState(
    form.formAction,
    form.initialState,
  );

  useEffect(() => {
    if (!state.error && state.result) {
      if (form.notifyFormSent) {
        form.notifyFormSent(true);
        if (form.refreshItemList) {
          form.refreshItemList(state.result);
        }
      }
    }
  }, [state])

  const FormFields = () => {
    return (
      <InputPattern 
        field="quantityWithButtons"
        dict={dict.number}
        defaultValue={String(state.result?.number)}
        className=""
        label={true}
        errorMessages={state.errorMessages.number}
      />
    )
  }

  return (
    <form id={form.formName} action={action}>
      <div className="grid gap-4 py-4">
        <FormFields />
        <SubmitFormButtonPattern 
          formName={form.formName}
          isPending={isPending}
          className=""
          dict={dict.button}
        />
        <input type="hidden" name="locale" value={locale} />
        <FormSuccessPattern 
          message={state.message}
        />
      </div>
    </form>
  )
}
