/** Local components */
import { 
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/app/ui/components/dialog"

interface DialogWrapperHeaderProps {
  title: string;
  description?: string;
}

export default function DialogWrapperHeader({
  title,
  description
}: DialogWrapperHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogDescription>
          {description}
        </DialogDescription>
      )}
    </DialogHeader>
  )
}
