// Default values
import { gridCols } from "@/app/lib/searchParams";

// Actions
import { retrieve } from "@/app/lib/requests/generics/retrieve";
import { getDictionary } from "@/lib/dictionaries";
import retrieveByForeignId from "@/app/lib/requests/generics/retrieveByForeignId";

// Local components
import { ScrollArea } from "@/app/ui/components/scroll-area";
import PaginationPattern from "@/app/ui/patterns/pagination/PaginationPattern";
import FilterSubcategories from "@/app/ui/patterns/filter/data/FilterSubcategories";
import ListSubcategoriesWithExtraClient from "./ListSubcategoriesWithExtraClient";

// Types and interfaces
import { SubcategoriesWithExtra } from "@/app/lib/types/data/subcategories";
import { SearchParams } from "@/app/lib/types/pageParams";
import { Locale } from "@/lib/dictionaries";
import { Category } from "@/app/lib/types/data/categories";

type Props =
  | {
      hideFilters: {
        category?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["subcategories"];
      locale: Locale;
      type: "complete";
      forceLayout: "list" | "dynamic";
    }
  | {
      hideFilters: {
        category?: boolean;
        search?: boolean;
      };
      searchParams?: SearchParams["subcategories"];
      locale: Locale;
      type: "category";
      category: Category;
      forceLayout: "list" | "dynamic";
  };

export default async function ListSubcategoriesWithExtra(props: Props) {
  const { searchParams, locale, type, hideFilters, forceLayout } = props;
  let currentCategory;

  let pList;
  if (type === "category") {
    const { category } = props;
    currentCategory = category;

    pList = retrieveByForeignId({
      request: "SubcategoryWithExtra",
      foreign: "Category",
      id: category.id as string,
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  } else {
    pList = retrieve({
      request: "SubcategoriesWithExtra",
      page: searchParams?.pagination?.page,
      perPage: searchParams?.pagination?.perPage,
      filters: JSON.stringify(searchParams?.filters),
    });
  }
  const pDict = getDictionary(locale);
  const pSubcategories = retrieve({
    request: "Subcategories",
    paginationOff: "true",
  });
  const pCategories = retrieve({
    request: "Categories",
    paginationOff: "true",
  });

  const [list, dict, categories, subcategories] = 
    await Promise.all([pList, pDict, pCategories, pSubcategories])

  return (
    <>
      <ScrollArea scrollHideDelay={10000} className="h-full">
        <div className={`grid gap-2 ${
          forceLayout === "list"
          ? "xl:grid-cols-1"
          : searchParams?.pagination?.layout
            ? `${gridCols[searchParams.pagination.layout]}`
            : "xl:grid-cols-3"
        }`}>
          {type === "complete" && (
            <ListSubcategoriesWithExtraClient
              type={type}
              filters={searchParams?.filters}
              pagination={searchParams?.pagination}
              subcategoriesWithExtra={list.data as SubcategoriesWithExtra}
              dictDialogReplace={dict.subcategory.dialogs.replace}
              dictDialogEdit={dict.subcategory.dialogs.edit}
              dictCard={dict.subcategory.card}
              dictNotFound={dict.misc.notFound}
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
          )}
          {type === "category" && (
            <ListSubcategoriesWithExtraClient 
              type={type}
              category={currentCategory as Category}
              filters={searchParams?.filters}
              pagination={searchParams?.pagination}
              subcategoriesWithExtra={list.data as SubcategoriesWithExtra}
              dictDialogReplace={dict.subcategory.dialogs.replace}
              dictDialogEdit={dict.subcategory.dialogs.edit}
              dictCard={dict.subcategory.card}
              dictNotFound={dict.misc.notFound}
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
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end border-t xl:h-[57px]">
        <FilterSubcategories
          dict={dict.filters}
          fields={{
            search: { dict: dict.form.fields.search },
            categories: {
              list: categories.data ? categories.data : [],
              dict: dict.form.fields.categories,
            }
          }}
          hide={hideFilters}
        />
        <PaginationPattern
          forceLayout={forceLayout}
          totalPages={list.totalPages as number}
          type="subcategories"
        />
      </div>
    </>
  );
}
