import { useActionState, useEffect } from "react"
import { AddZoneDialogState, AddZoneDialogAction } from "./action";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Loader2 } from "lucide-react";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import { Button } from "@/components/button"

import { AddZoneDialogProps } from "./dialog";
interface AddZoneDialogFormProps extends AddZoneDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // zone: Zone;
}

export default function AddZoneDialogForm({
  handleAddZone, 
  dict_zone_add_dialog,
  lang,
  setOpen 
}: AddZoneDialogFormProps) {
  const initialState: AddZoneDialogState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    },
  }
  const [state, action, isPending] = useActionState(AddZoneDialogAction, initialState);
  
  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false);
      handleAddZone(state.result);
    }
  }, [state]);

  return (
    <form action={action} id="category_dialog">
      <div className="grid gap-4 py-4">
        <input type="hidden" name="locale" value={lang} />
        <div>
          <Label htmlFor="name" className="text-right">{dict_zone_add_dialog.fields.name.label}</Label>
          <Input
            className={`${state.errorMessages.name.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="name"
            placeholder={dict_zone_add_dialog.fields.name.placeholder}/>
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.name} />
        </div>
        <Button 
          disabled={isPending} 
          className="mt-2 w-full" 
          type="submit" 
          form="category_dialog">
            {isPending ? 
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict_zone_add_dialog.pending}</>
            : dict_zone_add_dialog.button}
        </Button>
        {state.error ? (
          <FormError 
            message={state.message!} />
        ) 
        : (
          <FormSuccess message={state.message!} />
        )}
      </div>
    </form>
  )
}
