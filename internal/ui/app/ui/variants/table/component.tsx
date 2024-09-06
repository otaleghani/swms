import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

import { Variant } from "@/app/lib/types";

interface VariantsTableProps {
  variants: Variant[];
  dict: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
}

export default function VariantsTable({
  variants,
  dict,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,
}: VariantsTableProps) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="!bg-white">
          <TableHead className="">{dict.header.name}</TableHead>
          <TableHead>{dict.header.identifier}</TableHead>
          <TableHead>{dict.header.quantity}</TableHead>
          <TableHead>{dict.header.dimensions}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {variants.length === 0 || variants[0] === undefined ? (
          <TableRow className="!bg-white">
            <TableCell>Nessuna variante</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>) : (
          variants.map((variant: Variant) => (
            <TableRow className="!bg-white" key={variant.identifier + variant.name}>
              <TableCell className="font-medium">{variant.name}</TableCell>
              <TableCell>{variant.identifier}</TableCell>
              <TableCell>{variant.quantity}</TableCell>
              <TableCell>{variant.width} x {variant.length} x {variant.heigth}, {variant.weight}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="aspect-square p-2 rounded borde">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Modifica qui il component</DropdownMenuItem>
                    <DropdownMenuItem>Elimina qui il component</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}

      </TableBody>
    </Table>
  )
}

