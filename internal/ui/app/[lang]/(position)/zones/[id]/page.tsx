// Default states

// Actions
import { getDictionary, Locale } from "@/lib/dictionaries";
import { createFormAction } from "@/app/lib/actions/create/createFormAction";
import { decodeSearchParams } from "@/app/lib/searchParams";

// Components
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper";
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern";

// Types and interfaces
import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";

export default async function ZonesIdPage({
  params,
  searchParams
}: DefaultPageProps) {
  const zone = await retrieveById("Zone", params.id ? params.id : "")
  const dict = await getDictionary(params.lang as Locale);
  const currentSearchParams = decodeSearchParams(searchParams.q)

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[{label: dict.zone.header.title, url: "/zones"}]}
        currentItem={zone.data?.name ? zone.data.name : ""}
      />
    )
  }
  
  const HeaderWrapperRight = () => {
    return (
      <></>
    )
  }
  return (
    <>
      <HeaderWrapper
        Left={HeaderWrapperLeft}
        Right={HeaderWrapperRight}
      />
    </>
  )
}

