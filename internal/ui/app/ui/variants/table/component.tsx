import { readFileSync } from 'fs';
import path from 'path'

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
}

export default function VariantsTable() {
  const settingsFilePath = path.join(process.cwd(), 'settings.json')
  const file = readFileSync(settingsFilePath, 'utf8')
  console.log(file)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Identificatore</TableHead>
          <TableHead>Quantita</TableHead>
          <TableHead>Dimensioni</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Variante</TableCell>
          <TableCell>ID124012341234</TableCell>
          <TableCell>123</TableCell>
          <TableCell>1 x 2 x 3, 29</TableCell>
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
      </TableBody>
    </Table>
  )
}

