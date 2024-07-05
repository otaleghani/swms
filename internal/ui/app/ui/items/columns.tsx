"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Item } from "./data"
import Link from "next/link"
import { Badge } from "@/components/badge"

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Name",
    // cell: ({ row }) => (<Button asChild variant="ghost"><Link href={"/items/" + row.id}>{row.original.name}</Link></Button>)
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (<Badge>{row.original.name}</Badge>),
  },
  {
    id: 'links',
    cell: ({ row }) => (<Link href={"/items/" + row.id} className="absolute top-0 left-0 w-full h-full cursor-pointer"></Link>)
  },
  {
    accessorKey: "name",
    header: "Name",
    // cell: ({ row }) => (<Button asChild variant="ghost"><Link href={"/items/" + row.id}>{row.original.name}</Link></Button>)
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (<Badge>{row.original.name}</Badge>),
  },
  {
    id: 'links',
    cell: ({ row }) => (<Link href={"/items/" + row.id} className="absolute top-0 left-0 w-full h-full cursor-pointer"></Link>)
  },
]
