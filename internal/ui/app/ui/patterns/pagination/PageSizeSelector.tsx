"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationType, SearchParams } from "@/app/lib/types/pageParams"
import { 
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "../../components/select"
import { decodeSearchParams, encodeSearchParams, deepMerge } from "@/app/lib/searchParams";

interface PageSizeSelectorProps {
  type: PaginationType;
}

function getPerPage(params: SearchParams, type: PaginationType) {
  if (params[type]?.pagination?.perPage) {
  console.log(params)
    return params[type]?.pagination?.perPage;
  }
  return 10;
}

export default function PageSizeSelector({
  type
}: PageSizeSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const params = new URLSearchParams(searchParams);
  const currentParams = decodeSearchParams(params.get("q"));
  const currentPerPage = getPerPage(currentParams, type)

  const [perPage, setPerPage] = useState(String(currentPerPage));

  const createPageURL = (perPageNumber: number) => {
    let diff: SearchParams = {};
    diff[type] = { ...{ pagination: { 
      perPage: Number(perPage),
      page: 1,
    } } };
    const newParams = deepMerge({ ...currentParams }, diff);
    const newParamsString = encodeSearchParams(newParams);
    params.set("q", newParamsString);
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    if (Number(perPage) != currentPerPage) {
      router.push(createPageURL(Number(perPage)))
    }
  }, [perPage]);

  return (
    <div className="flex items-center">
      <div className="pr-4 text-sm font-medium">
        Per page:
      </div>
      <Select 
        onValueChange={setPerPage}>
        <SelectTrigger className="w-24 h-8">
          <SelectValue placeholder={perPage} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
