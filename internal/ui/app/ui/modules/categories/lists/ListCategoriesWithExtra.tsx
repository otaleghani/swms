// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterCategories from "@/app/ui/patterns/filter/data/FilterCategories";
import ListCategoriesWithExtraClient from "./ListCategoriesWithExtraClient";

// Types and interfaces
import { CategoriesWithExtra } from "@/app/lib/types/data/categories";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";
import { Response } from "@/app/lib/types/misc";

interface Props {
  searchParams?: SearchParams["categories"];
  locale: Locale;
  list: Response<CategoriesWithExtra>;
}

export default async function ListCategoriesWithExtra({
  searchParams,
  locale,
  list,
}: Props) {
  const dict = await getDictionary(locale);
  const categories = await retrieve({
    request: "Categories",
    paginationOff: "true",
  });


  return (
    <>
      <ScrollArea
        scrollHideDelay={10000}
        className="xl:h-[calc(100vh_-_114px)] "
      >
        <div
          className={`${
            searchParams?.pagination?.layout
              ? `${gridCols[searchParams.pagination.layout]}`
              : "xl:grid-cols-3"
          }`}
        >
          <ListCategoriesWithExtraClient
            filters={searchParams?.filters}
            pagination={searchParams?.pagination}
            categoriesWithExtra={list.data as CategoriesWithExtra}
            dictDialogReplace={dict.category.dialogs.replace}
            dictDialogEdit={dict.category.dialogs.edit}
            dictCard={dict.category.card}
            fields={{
              name: { dict: dict.form.fields.name },
              description: { dict: dict.form.fields.description },
              button: dict.form.buttons.submit,
              category: {
                list: categories.data ? categories.data : [],
                name: "Category",
                dict: dict.form.fields.categories,
              },
            }}
          />
          {list.data === null && <>{dict.misc.notFound}</>}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterCategories
          dict={dict.filters}
          fields={{
            search: {
              dict: dict.form.fields.search,
            },
          }}
        />
        <PaginationPattern
          forceLayout="dynamic"
          totalPages={list.totalPages as number}
          type="categories"
        />
      </div>
    </>
  );
}
