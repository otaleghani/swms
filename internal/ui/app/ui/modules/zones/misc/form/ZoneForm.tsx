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
} from "@/app/lib/types/data/zones";

import { 
  DictInputField,
  DictFormButton,
} from "@/app/lib/types/dictionary/form";

export interface DictZoneForm {
  name: DictInputField;
  button: DictFormButton;
}

export interface ZoneFormProps {
  form: FormProps<Zone>;
  dict: DictZoneForm;
}

export default function ZoneForm({
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
        field="name"
        dict={dict.name}
        defaultValue={state.result?.name}
        className=""
        label={true}
        errorMessages={state.errorMessages.name}
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
      </div>
    </form>
  )
}
