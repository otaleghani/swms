"use client";

/** React hooks */
import { 
  useActionState, 
  useEffect, 
  Dispatch, 
  SetStateAction 
} from "react";

/** Next hooks */
import { usePathname } from "next/navigation";

/** Types and interfaces */
import { FormState } from "@/app/lib/types/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

/** Local components */
import SubmitFormButtonPattern from "./buttons/SubmitFormButtonPattern";

export interface FormPatternProps<Entity> {
  formName: string;
  initialState: FormState<Entity>;
  formAction: (
    currentState: FormState<Entity>,
    formData: FormData,
  ) => Promise<FormState<Entity>>;
  notifyFormSent?: Dispatch<SetStateAction<boolean>>;
  refreshItemList?: (item: Entity) => Promise<void>;
  FormFields?: React.FunctionComponent;
  dictButton: DictFormButton
}

export default function FormPattern<Entity>({
  formName,
  initialState,
  formAction,
  notifyFormSent,
  refreshItemList,
  FormFields,
  dictButton,
}: FormPatternProps<Entity>) {
  const locale = usePathname().split("/")[1];
  const [state, action, isPending] = useActionState(
    formAction,
    initialState
  );

  useEffect(() => {
    // Used to trigger actions after the form was sent.
    // Usually notifyFormSent is used to close dialogs,
    // while refreshItemList refreshes a client side list
    // of certain items, adding the newly added item 
    // in the list without querying the db again.
    
    if (!state.error && state.result) {
      if (notifyFormSent) {
        notifyFormSent(true);
        if (refreshItemList) {
          refreshItemList(state.result);
        }
      }
    }
  }, [state])

  return (
    <form id={formName} action={action}>
      <div className="grid gap-4 py-4">
        <input type="hidden" name="locale" value={locale} />
        {
          FormFields && (<FormFields />)
        }
        <SubmitFormButtonPattern 
          formName={formName}
          isPending={isPending}
          className=""
          dict={dictButton}
        />
      </div>
    </form>
  )
}
