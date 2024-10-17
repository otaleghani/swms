import { useActionState, useEffect } from "react"
import { AddShelfDialogState, AddShelfDialogAction } from "./action";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Loader2 } from "lucide-react";

import FormFieldError from "@/app/ui/general/form/error_field";
import FormError from "@/app/ui/general/form/error_form";
import FormSuccess from "@/app/ui/general/form/success";

import { Button } from "@/components/button"

import { AddShelfDialogProps } from "./dialog";
interface AddShelfDialogFormProps extends AddShelfDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddShelfDialogForm({
  handleAddShelf, 
  dict_shelf_add_dialog,
  lang,
  zone,
  aisle,
  rack,
  setOpen }: AddShelfDialogFormProps) {
  const initialState: AddShelfDialogState = {
    error: false,
    errorMessages: {
      name: [],
      zone: [],
      aisle: [],
      rack: [],
    },
  }
  const [state, action, isPending] = useActionState(AddShelfDialogAction, initialState);
  
  useEffect(() => {
    if (!state.error && state.message) {
      setOpen(false);
      handleAddShelf(state.result);
    }
  }, [state]);

  return (
    <form action={action} id="category_dialog">
      <div className="grid gap-4 py-4">
        <input type="hidden" name="locale" value={lang} />

        <div>
          <Label htmlFor="name" className="text-right">{dict_shelf_add_dialog.fields.name.label}</Label>
          <Input
            className={`${state.errorMessages.name.length != 0 
            ? "border-red-500" 
            : ""}`}
            name="name"
            placeholder={dict_shelf_add_dialog.fields.name.placeholder}/>
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.name} />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">{dict_shelf_add_dialog.fields.zone.label}</Label>
          <input type="hidden" value={zone.id} name="zone" />
          <Input
            className={`${state.errorMessages.zone.length != 0 
            ? "border-red-500" 
            : ""}`}
            disabled
            defaultValue={zone.name} />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.zone} />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">{dict_shelf_add_dialog.fields.aisle.label}</Label>
          <input type="hidden" value={aisle.id} name="aisle" />
          <Input
            className={`${state.errorMessages.aisle.length != 0 
            ? "border-red-500" 
            : ""}`}
            disabled
            defaultValue={aisle.name} />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.aisle} />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">{dict_shelf_add_dialog.fields.rack.label}</Label>
          <input type="hidden" value={rack.id} name="rack" />
          <Input
            className={`${state.errorMessages.rack.length != 0 
            ? "border-red-500" 
            : ""}`}
            disabled
            defaultValue={rack.name} />
          <FormFieldError 
            id="email-error" 
            description={state.errorMessages.rack} />
        </div>

        <Button 
          disabled={isPending} 
          className="mt-2 w-full" 
          type="submit" 
          form="category_dialog">
            {isPending ? 
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{dict_shelf_add_dialog.pending}</>
            : dict_shelf_add_dialog.button}
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
