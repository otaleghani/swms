import { retrieve } from "@/app/lib/requests/generics/retrieve"
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";
import { SearchParams } from "@/app/lib/types/pageParams";

interface Props {
  hideFilters: {
    name?: boolean;
    description?: boolean;
    quantity?: boolean;
    identifier?: boolean;
    length?: boolean;
    width?: boolean;
    height?: boolean;
    weight?: boolean;
    isDefaultVariant?: boolean;
  };
  searchParams?: SearchParams[];
}

export default async function ListVariants({}: Props) {
  const pUnits = retrieve({ request: "Units", paginationOff: "true" });

  const [units] = await Promise.all([pUnits]);

  return (
    <>
      
    </>
  )
}
