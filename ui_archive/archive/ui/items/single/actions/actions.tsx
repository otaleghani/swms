import { AddNewTransaction } from "@/app/ui/items/single/actions/add-new-transaction"

import { Button } from "@/components/button"
import { Archive, Trash2, Pencil, QrCode } from "lucide-react"

export function Actions() {
  return (
    <header className="sticky gap-4 top-0 border-b p-4 h-[57px] flex justify-between items-center bg-background z-10">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Archive className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <QrCode className="h-4 w-4" />
        </Button>
      </div>
      <AddNewTransaction />
      
      {
      // <Button variant="outline" size="sm">
      //   <Plus className="h-4 w-4 mr-2" /> New Variant
      // </Button>
      }
    </header>
  )
}
