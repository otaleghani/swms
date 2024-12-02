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
  fields: {
    button: DictFormButton
  }
}

export function DialogVariantDelete({fields}: Props) {
  

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
                form
              }}
              type="Delete"
              showButton
            />

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
