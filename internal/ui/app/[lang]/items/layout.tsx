import { DataTable } from "@/app/ui/items/data-table"
import { columns } from "@/app/ui/items/columns"
import { items } from "@/app/ui/items/data"

interface LayoutItemsProps {
  children: React.ReactNode
}

export default function ItemsLayout({ children }: LayoutItemsProps) {
  return (
    <div className="grid xl:grid-cols-2 p-2">
      <div>
        <DataTable columns={columns} data={items} />
      </div>
      <div>{children}</div>
    </div>
  )
}
