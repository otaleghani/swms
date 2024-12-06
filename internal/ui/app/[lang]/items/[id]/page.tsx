import { DefaultPageProps } from "@/app/lib/types/pageParams";
import { decodeSearchParams } from "@/app/lib/searchParams";
import { Locale } from "@/lib/dictionaries";
import { retrieveById } from "@/app/lib/requests/generics/retrieveById";
import ListVariants from "@/app/ui/modules/variants/lists/ListVariants";
import { Item } from "@/app/lib/types/data/items";

export default async function ItemIdPage({
  params,
  searchParams,
}: DefaultPageProps) {
  const pItem = retrieveById("Item", params.id ? params.id : "");
  const currentSearchParams = decodeSearchParams(searchParams.q)

  const [item] = await Promise.all([pItem]);

  return (
    <div>
      <ListVariants
        hideFilters={{ item: true }}
        searchParams={currentSearchParams.variants}
        item={item.data as Item}
        locale={params.lang as Locale}
      />
      
    </div>
  )
}
