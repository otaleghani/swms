"use client";

// Actions
import { useEffect, useState } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { syncPaginatedSubcategoriesWithExtra } from "@/app/lib/synchronizers/extra/subcategories/list";

// Workers
import streamer from "@/app/lib/workers";

// Components
import CardSubcategoryWithExtra from "../cards/CardSubcategoryWithExtra";

// Types and interfaces
import { SubcategoryWithExtra } from "@/app/lib/types/data/subcategories";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { SubcategoryFiltersParams } from "@/app/lib/types/query/data";
import { PaginationParams } from "@/app/lib/types/pageParams";

interface Props {
  filters?: SubcategoryFiltersParams;
  pagination?: PaginationParams;
  subcategoriesWithExtra: SubcategoryWithExtra[];
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  dictCard: DictLabelList<"items">;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    category: SelectFieldProps<"Category">;
    subcategory: SelectFieldProps<"Subcategory">;
  };
}

// Client function to handle changes on list client side
export default function ListSubcategoriesWithExtraClient({
  pagination,
  filters,
  subcategoriesWithExtra,
  dictDialogEdit,
  dictDialogReplace,
  dictCard,
  fields,
}: Props) {
  const [currentCategories, setCurrentCategories] = useState(fields.category.list);
  const [currentSubcategories, setCurrentSubcategories] = useState(fields.subcategory.list);
  const [currentSubcategoriesWithExtra, setCurrentSubcategoriesWithExtra] =
    useState(subcategoriesWithExtra);

  useEffect(() => {
    synchronizeList<"Category">({
      streamer: streamer as Worker,
      list: currentCategories,
      setList: setCurrentCategories,
      type: "Category",
    });
    synchronizeList<"Subcategory">({
      streamer: streamer as Worker,
      list: currentSubcategories,
      setList: setCurrentSubcategories,
      type: "Subcategory",
    });

    syncPaginatedSubcategoriesWithExtra({
      filters: filters,
      pagination: pagination,
      streamer: streamer as Worker,
      list: currentSubcategoriesWithExtra,
      setList: setCurrentSubcategoriesWithExtra,
    });
  }, []);

  return (
    <>
      {currentSubcategoriesWithExtra &&
        currentSubcategoriesWithExtra.map((item: SubcategoryWithExtra) => (
          <CardSubcategoryWithExtra
            key={item.subcategory.id}
            item={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={{
              ...fields,
              category: {
                ...fields.category,
                list: currentCategories,
              },
              subcategory: {
                ...fields.subcategory,
                list: currentSubcategories,
              },
            }}
          />
        ))}
    </>
  );
}
