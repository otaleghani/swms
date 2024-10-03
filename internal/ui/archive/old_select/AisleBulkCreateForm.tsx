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
import { AislesBulkPostRequestBody } from "@/app/lib/types/data/aisles";

import { 
  DictInputField,
  DictFormButton,
  DictSelectField,
} from "@/app/lib/types/dictionary/form";
import FormSuccessPattern from "@/app/ui/patterns/form/FormSuccessPattern";
import FormErrorPattern from "@/app/ui/patterns/form/FormErrorPatter";
import SelectPosition from "@/app/ui/general/form/select/position/field";
import PositionSelectField from "../../positions/PositionSelectField";
import { SelectFieldWithAddProps } from "../../positions/PositionSelectField";
import { Zone } from "@/app/lib/types/data/zones";

export interface DictBulkAisleForm {
  number: DictInputField;
  button: DictFormButton;
  //zone: DictSelectField;
}

export interface AisleBulkFormProps {
  self: {
    form: FormProps<AislesBulkPostRequestBody>;
    dict: DictBulkAisleForm;
  }
  propsPositionSelect: {
    fields: {
      zone: SelectFieldWithAddProps<Zone, "Zone">;
    }
  }
}

export default function AisleBulkCreateForm({
  self,
  propsPositionSelect
}: AisleBulkFormProps) {
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
      <>
        <InputPattern 
          field="quantityWithButtons"
          dict={self.dict.number}
          defaultValue={String(state.result?.number)}
          className=""
          label={true}
          errorMessages={state.errorMessages.number}
        />
        <PositionSelectField 
          fields={propsPositionSelect.fields}
        />
      </>
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
