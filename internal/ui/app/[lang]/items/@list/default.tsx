import { columns } from "@/app/ui/items/columns"
import { Item, items} from "@/app/ui/items/data/example"
import { DataTable } from "@/app/ui/items/data-table"
import { Suspense } from "react";
import { headers } from "next/headers";

async function getData(): Promise<Item[]> {
  return items
}

export default async function ListItemsDefaultPage() {
  //const pathname = headers().get('x-current-path') as string;
  //const pathnameNoLocale: string = pathname.slice(4);
  const data = await getData()

  return (
    <>
      {
      //<div className={"items" === pathnameNoLocale ? "p-2 h-screen overflow-scroll w-full" : "p-2 xl:block h-screen overflow-scroll w-full"}>
      }
      <div className="xl:col-start-auto xl:row-start-auto row-start-1 row-end-1">
        <Suspense>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </div>
    </>
  )
}


// <div className="h-[2000px]">
//   List item here DEFAULT
//   <Link href="/items/123">123</Link>
//   <Link href="/items/456">456</Link>
//   <Link href="/items/789">789</Link>
// </div>
// <div className="h-[2000px] w-full bg-purple-400">
//   List item here DEFAULT
//   <Link href="/items/123">123</Link>
//   <Link href="/items/456">456</Link>
//   <Link href="/items/789">789</Link>
// </div>


// 'use client';
// 
// import { usePathname } from "next/navigation";
// import DemoTable from "./container";
// import { Suspense } from "react";
// 
// export default function ListItemsDefaultPage() {
//   const pathname = usePathname();
//   let pathnameNoLocale: string = pathname.slice(4);
// 
//   return (
//     <>
//       <div className={"items" === pathnameNoLocale ? "col-span-2 xl:block h-screen overflow-scroll w-full bg-red-300" : "xl:block hidden h-screen overflow-scroll w-full bg-red-300"}>
//         <Suspense>
//           <DemoTable />
//         </Suspense>
//       </div>
//     </>
//   )
// }
