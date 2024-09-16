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
  locale: string;
  dict: any;
}

export default function ZoneAddForm({
  notifyFormSent,
  refreshItemList,
  locale,
  dict
}: ZoneAddFormProps) {
  const formName = "zone-select-field";
  const initialState = defaultZoneFormState;
  const [state, action, isPending] = useActionState(
    zoneAddFormAction,
    initialState
  );
  const pathName = usePathname();
  console.log(pathName);

  useEffect(() => {
    console.log(pathName);
  }, [dict])

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
