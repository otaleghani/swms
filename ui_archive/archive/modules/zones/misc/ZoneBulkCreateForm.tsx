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
import FormErrorPattern from "@/app/ui/patterns/form/FormErrorPatter";

export interface DictBulkZoneForm {
  number: DictInputField;
  button: DictFormButton;
}

export interface ZoneBulkFormProps {
  self: {
    form: FormProps<ZonesBulkPostRequestBody>;
    dict: DictBulkZoneForm;
  }
}

export default function ZoneBulkCreateForm({
  self,
}: ZoneBulkFormProps) {
  const locale = usePathname().split("/")[1];
  const [state, action, isPending] = useActionState(
    self.form.formAction,
    self.form.initialState,
  );

  useEffect(() => {
    if (!state.error && state.result) {
      if (self.form.notifyFormSent) {
        self.form.notifyFormSent(true);
        if (self.form.refreshItemList) {
          self.form.refreshItemList(state.result);
        }
      }
    }
  }, [state])

  const FormFields = () => {
    return (
      <InputPattern 
        field="quantityWithButtons"
        dict={self.dict.number}
        defaultValue={String(state.result?.number)}
        className=""
        label={true}
        errorMessages={state.errorMessages.number}
      />
    )
  }

  return (
    <form id={self.form.formName} action={action}>
      <div className="grid gap-4 py-4">
        <FormFields />
        <SubmitFormButtonPattern 
          formName={self.form.formName}
          isPending={isPending}
          className=""
          dict={self.dict.button}
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
