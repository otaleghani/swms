// 'use client';
// 
// import { Item } from "./data/example";
// import Link from "next/link";
// import { ColumnDef } from "@tanstack/react-table"
// 
// export const columns: ColumnDef<Item>[] = [
//   {
//     header: '',
//     id: 'links',
//     cell: (({ row }) => (<Link href={"/items/" + row.id}>Anvedi oh</Link>)),
//   },
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//   },
//   {
//     accessorKey: "quantity",
//     header: "Quantity",
//   },
// ]
