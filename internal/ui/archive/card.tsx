// What data do we want to show?
// name
// quantity
// category
// subcategory
// last update -> Last transaction?
// description
// one image
//

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/badge"
import { Button } from "@/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"

export default function CardList() {
  return (
  <>
    <header className="sticky top-0 border-b p-4 h-[57px] flex items-center">
      <h1 className="font-semibold text-xl leading-none tracking-tight">Products</h1>
    </header>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden !w-[100px] sm:table-cell"><span className="sr-only">Image</span></TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Quantity</TableHead>
          <TableHead><span className="sr-only">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="hidden sm:table-cell">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              height="64"
              src="/assets/placeholder.svg"
              width="64"
            />
          </TableCell>
          <TableCell >
            <div className="flex flex-col">
              <span className="font-medium">Laser Lemonade MachineLaser Lemonade Machine</span>
              <span>something else</span>
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="outline">Draft</Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">25</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
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
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div className="text-xs text-muted-foreground">
      Showing <strong>1-10</strong> of <strong>32</strong> products
    </div>
    </>
  )
}
