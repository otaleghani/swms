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

/** Local components */
import InputPattern from "@/app/ui/patterns/form/input/InputPattern";
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";

/** Actions */
import zoneAddFormAction from "./action"

/** Types and interfaces */
import { Zone, ZoneFormState, defaultZoneFormState } from "@/app/lib/types/data/zones";

interface ZoneAddFormProps {
  notifyFormSent?: Dispatch<SetStateAction<boolean>>;
  refreshItemList?: (item: Zone) => Promise<void>;
  dict: any;
}

export default function ZoneAddForm({
  notifyFormSent,
  refreshItemList,
  dict
}: ZoneAddFormProps) {
  const formName = "zone-select-field";
  const initialState = defaultZoneFormState;
  const [state, action, isPending] = useActionState(
    zoneAddFormAction,
    initialState
  );
  const locale = usePathname().split("/")[1];

  return (
    <form id={formName} action={action}>
      <div className="grid gap-4 py-4">
        <InputPattern 
          field="name"
          dict={dict}
          defaultValue=""
          className=""
          label={true}
          errorMessages={state.errorMessages.name}
        />
        <input type="hidden" name="locale" value={locale} />
        <SubmitFormButtonPattern 
          formName={formName}
          isPending={isPending}
          className=""
          dict={dict}
        />
      </div>
    </form>
  )
}
