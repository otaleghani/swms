// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterSubcategories from "@/app/ui/patterns/filter/data/FilterSubcategories";
import ListSubcategoriesWithExtraClient from "./ListSubcategoriesWithExtraClient";

// Types and interfaces
import { SubcategoriesWithExtra } from "@/app/lib/types/data/subcategories";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";
import { Response } from "@/app/lib/types/misc";

interface Props {
  searchParams?: SearchParams["subcategories"];
  locale: Locale;
  list: Response<SubcategoriesWithExtra>;
}

export default async function ListSubcategoriesWithExtra({
  searchParams,
  locale,
  list,
}: Props) {
  const dict = await getDictionary(locale);
  const subcategories = await retrieve({
    request: "Subcategories",
    paginationOff: "true",
  });
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
          <ListSubcategoriesWithExtraClient
            filters={searchParams?.filters}
            pagination={searchParams?.pagination}
            subcategoriesWithExtra={list.data as SubcategoriesWithExtra}
            dictDialogReplace={dict.subcategory.dialogs.replace}
            dictDialogEdit={dict.subcategory.dialogs.edit}
            dictCard={dict.subcategory.card}
            fields={{
              name: { dict: dict.form.fields.name },
              description: { dict: dict.form.fields.description },
              button: dict.form.buttons.submit,
              category: {
                list: categories.data ? categories.data : [],
                name: "Category",
                dict: dict.form.fields.categories,
              },
              subcategory: {
                list: subcategories.data ? subcategories.data : [],
                name: "Subcategory",
                dict: dict.form.fields.subcategories,
              },
            }}
          />
          {list.data === null && <>{dict.misc.notFound}</>}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterSubcategories
          dict={dict.filters}
          fields={{
            search: { dict: dict.form.fields.search },
            categories: {
              list: subcategories.data ? subcategories.data : [],
              dict: dict.form.fields.categories,
            }
          }}
        />
        <PaginationPattern
          forceLayout="dynamic"
          totalPages={list.totalPages as number}
          type="subcategories"
        />
      </div>
    </>
  );
}
