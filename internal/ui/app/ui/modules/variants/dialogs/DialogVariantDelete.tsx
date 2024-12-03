import { removeFormAction } from "@/app/lib/actions/remove/removeFormAction"
import { defaultRemoveFormState } from "@/app/lib/types/data/remover"
import { Variant } from "@/app/lib/types/data/variants"
import { DictFormButton } from "@/app/lib/types/dictionary/form"
import { fieldsDefaultProps } from "@/app/lib/types/form/fields"
import {
  AlertDialog,
  AlertDialogAction,
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

interface Props {
  variant: Variant
  fields: {
    button: DictFormButton
  }
}

export function DialogVariantDelete({
  fields,
  variant
}: Props) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>

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

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {
          //<AlertDialogAction>Continue</AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
