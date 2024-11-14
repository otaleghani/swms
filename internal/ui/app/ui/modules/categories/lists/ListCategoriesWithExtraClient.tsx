"use client";

// Actions
import { useEffect, useState } from "react";
import { syncPaginatedCategoriesWithExtra } from "@/app/lib/synchronizers/extra/categories/list";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardCategoryWithExtra from "../cards/CardCategoryWithExtra";

// Types and interfaces
import { CategoryWithExtra } from "@/app/lib/types/data/categories";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { CategoryFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

interface Props {
  filters?: CategoryFiltersParams;
  pagination?: PaginationParams;
  categoriesWithExtra: CategoryWithExtra[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"items" | "subcategories">;
  dictNotFound: string;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    category: SelectFieldProps<"Category">;
  };
}

// Client function to handle changes on list client side
export default function ListCategoriesWithExtraClient({
  pagination,
  filters,
  categoriesWithExtra,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  dictNotFound,
  fields,
}: Props) {
  const [currentCategoriesWithExtra, setCurrentCategoriesWithExtra] =
    useState(categoriesWithExtra);

  useEffect(() => {
    syncPaginatedCategoriesWithExtra({
      filters: filters,
      pagination: pagination,
      streamer: streamer as Worker,
      list: currentCategoriesWithExtra,
      setList: setCurrentCategoriesWithExtra,
    });
  }, []);

  return (
    <>
      {currentCategoriesWithExtra &&
        currentCategoriesWithExtra.map((item: CategoryWithExtra) => (
          <CardCategoryWithExtra
            key={item.category.id}
            item={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={fields}
          />
        ))}
      {!currentCategoriesWithExtra && <><div className="p-4">{dictNotFound}</div></>}
    </>
  );
}
