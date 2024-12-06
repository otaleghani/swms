import { removeFormAction } from "@/app/lib/actions/remove/removeFormAction"
import { defaultRemoveFormState } from "@/app/lib/types/data/remover"
import { Variant } from "@/app/lib/types/data/variants"
import { DictFormButton } from "@/app/lib/types/dictionary/form"
import { DictDialog } from "@/app/lib/types/dictionary/misc"
import { fieldsDefaultProps } from "@/app/lib/types/form/fields"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/ui/components/alert-dialog"
import { Button } from "@/app/ui/components/button"
import FormPattern from "@/app/ui/patterns/form/FormPattern"
import { EditIcon, Trash } from "lucide-react"

interface Props {
  variant: Variant
  fields: {
    button: DictFormButton
  }
  dict: DictDialog;
}

export default function DialogVariantDelete({
  fields,
  variant,
  dict,
}: Props) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          size="sm"
          variant="outline"
          className="aspect-square p-0 h-10 w-10"
        ><Trash className="w-4 h-4"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dict.title}</AlertDialogTitle>
          <AlertDialogDescription>{dict.description}</AlertDialogDescription>

            <FormPattern<"Delete"> 
              self={{
                fields: {
                  ...fieldsDefaultProps,
                  button: fields.button,
                }
              }}
              form={{
                formName: "deleteVariant" + variant.id as string,
                formAction: removeFormAction,
                initialState: {
                  ...defaultRemoveFormState,
                  result: {
                    id: variant.id as string,
                    type: "Variant"
                  }
                }
              }}
              type="Delete"
              showButton
            />

        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{dict.clear}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
