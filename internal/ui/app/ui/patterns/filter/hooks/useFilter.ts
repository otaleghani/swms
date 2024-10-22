import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { decodeSearchParams, encodeSearchParams } from "@/app/lib/searchParams";

export const useFilterParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const encodedParams = new URLSearchParams(searchParams);
  const decodedParams = decodeSearchParams(encodedParams.get("q"));
  const [params, setParams] = useState(decodedParams);
  const [link, setLink] = useState("");

  useEffect(() => {
    const newParamsString = encodeSearchParams(params);
    encodedParams.set("q", newParamsString);
    setLink(`${pathname}?${encodedParams.toString()}`);
  }, [params])

  return { params, setParams, link };
};

//export const useGenerateFilterParamsURL = (
//  updatedParams: SearchParams
//) => {
//  const pathname = usePathname();
//  const searchParams = useSearchParams();
//  const params = new URLSearchParams(searchParams);
//  const [link, setLink] = useState("");
//
//  useEffect(() => {
//    const newParamsString = encodeSearchParams(updatedParams);
//    params.set("q", newParamsString);
//    setLink(`${pathname}?${params.toString()}`);
//  }, [updatedParams])
//
//  return { link }
//}
