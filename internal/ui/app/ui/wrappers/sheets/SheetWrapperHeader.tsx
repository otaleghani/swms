/** Local components */
import {
  SheetHeader,
  SheetTitle,
} from "@/app/ui/components/sheet"

interface SheetWrapperHeader {
  title: string;
}

export default function SheetWrapperHeader({
  title,
}: SheetWrapperHeader) {
  return (
    <SheetHeader className="p-4 bg-gray-50">
      <SheetTitle className="text-left text-sm">
        {title}
      </SheetTitle>
    </SheetHeader>
  )
}
