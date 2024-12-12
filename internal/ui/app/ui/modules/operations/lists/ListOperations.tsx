import { retrieve } from "@/app/lib/requests/generics/retrieve";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";
import { Item, Items } from "@/app/lib/types/data/items";
import { Tickets } from "@/app/lib/types/data/tickets";
import { Users } from "@/app/lib/types/data/users";
import { Variants } from "@/app/lib/types/data/variants";
import { SearchParams } from "@/app/lib/types/pageParams";
import { ScrollArea } from "@/app/ui/components/scroll-area";
import FilterOpeartions from "@/app/ui/patterns/filter/data/FilterOperations";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import { getDictionary, Locale } from "@/lib/dictionaries";
import ListOperationsClient from "./ListOperationsClient";

interface Props {
  hideFilters: {
    search?: boolean;
    users?: boolean;
    items?: boolean;
    variants?: boolean;
    tickets?: boolean;
    date?: boolean;
  };
  searchParams?: SearchParams["operations"];
  locale: Locale;
  item: Item;
}
export default async function ListOperations({
  hideFilters,
  searchParams,
  locale,
  item
}: Props) {
  const pDict = getDictionary(locale);
  const pUsers = retrieve({request: "Users", paginationOff: "true"});
  const pTickets = retrieve({ request: "Tickets", paginationOff: "true" });
  const pVariantsByItem = retrieveByForeignId({
    request: "Variants",
    foreign: "Item",
    id: item.id as string,
    paginationOff: "true",
  });
  const pOperations = retrieveByForeignId({ 
    request: "Operations", 
    foreign: "Item",
    id: item.id as string,
    page: searchParams?.pagination?.page,
    perPage: searchParams?.pagination?.perPage,
    filters: searchParams?.filters,
  });

  const [dict, users, tickets, variantsByItem, operations] =
    await Promise.all([pDict, pUsers, pTickets, pVariantsByItem, pOperations]);

  return (
    <div className="xl:h-[calc((100vh_-_57px)_/_2)] flex flex-col ">
      <div className="font-semibold p-4 border-y">Operations</div>
      <ScrollArea className="gap-2 p-4 ">
        <div className="h-screen"></div>
        <ListOperationsClient 
          operations={operations.data ? operations.data : []}
          tickets={tickets.data ? tickets.data : []}
          variants={variantsByItem.data ? variantsByItem.data : []}
          users={users.data ? users.data : []}
          item={item}
          dictNotFound={dict.misc.notFound}
          filters={searchParams?.filters}
          pagination={searchParams?.pagination}
        />
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px] mt-auto">
        <FilterOpeartions
          locale={locale}
          dict={dict.filters}
          fields={{
            items: {
              list: [] as Items,
              dict: dict.form.fields.items,
            },
            date: {
              dict: dict.form.fields.date
            },
            tickets: {
              list: tickets.data as Tickets,
              dict: dict.form.fields.users
            },
            users: {
              list: users.data as Users,
              dict: dict.form.fields.users
            },
            variants: {
              list: variantsByItem.data as Variants,
              dict: dict.form.fields.variants
            },
            search: {
              dict: dict.form.fields.search
            }
          }}
          hide={hideFilters}
        />
        <PaginationPattern 
          forceLayout="list"
          totalPages={variantsByItem.totalPages as number} 
          type="aisles"
        />
      </div>
    </div>
  )
}
