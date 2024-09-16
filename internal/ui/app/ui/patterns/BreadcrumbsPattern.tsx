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
  items, 
  current_item 
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
        {items.length < 2 ? items.map((item: any) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.url}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={items[items.length-1].url}>{items[items.length-1].label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{current_item}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
