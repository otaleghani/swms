"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Item } from "./data"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { Badge } from "@/components/badge"
import { Button } from "@/components/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

const baseUrl = "/items/"
export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <Link href={baseUrl + row.original.id} className="hidden xl:block p-4">
        <Image
          alt={row.original.description}
          className="aspect-square rounded-md object-cover"
          src={row.original.image}
          width="64"
          height="64"
        />
      </Link>
    )
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link href={baseUrl + row.original.id} className="ml-[-2.4px] p-4 flex gap-8 justify-between items-center">
        <div className="flex flex-col">
          <span className="xl:w-80 w-40 overflow-hidden whitespace-nowrap text-ellipsis !font-medium">{row.original.name}</span>
          <span className="xl:w-80 w-40 overflow-hidden whitespace-nowrap text-ellipsis !font-medium hidden xl:block">{row.original.description}</span>
        </div>
        <Badge className="w-20 overflow-hidden text-ellipsis whitespace-nowrap hidden xl:block">{row.original.category}</Badge>
      </Link>
    )
  },
  {
    accessorKey: "quantity",
    header: "Qt",
    cell: ({ row }) => (<span className="block w-full font-left">{row.original.quantity}</span>),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-end p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="outline">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
]
