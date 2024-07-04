import DemoTable from "./container";
import { Suspense } from "react";
import { headers } from "next/headers";


export default function ListItemsDefaultPage() {
  //const pathname = usePathname();
  const pathname = headers().get('x-current-path') as string;
  const pathnameNoLocale: string = pathname.slice(4);
  console.log(pathnameNoLocale)

  return (
    <>
      <div className={"items" === pathnameNoLocale ? "col-span-2 xl:block h-screen overflow-scroll w-full bg-red-300" : "xl:block hidden h-screen overflow-scroll w-full bg-red-300"}>
        <Suspense>
          <DemoTable />
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
