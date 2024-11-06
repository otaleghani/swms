/** Next */
import Link from "next/link"

/** Local components */
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/ui/components/breadcrumb"

interface BreadcrumbsPatternProps {
  itemsList: {
    label: string;
    url: string;
  }[];
  currentItem: string;
}

export function BreadcrumbsPattern({ 
  itemsList, 
  currentItem 
}: BreadcrumbsPatternProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </>
        {itemsList.length < 2 ? itemsList.map((item: any) => (
          <div key={item.url} className="flex items-center gap-1.5">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.url}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        )) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={itemsList[itemsList.length-1].url}>{itemsList[itemsList.length-1].label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentItem}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
