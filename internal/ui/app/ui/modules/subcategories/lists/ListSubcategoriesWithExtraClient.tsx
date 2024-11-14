"use client";

// Actions
import { useEffect, useState } from "react";
import { syncPaginatedSubcategoriesWithExtra } from "@/app/lib/synchronizers/extra/subcategories/list";
import { synchronizeList } from "@/app/lib/synchronizers/lists";

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
import { Category } from "@/app/lib/types/data/categories";
import { syncPaginatedSubcategoriesByCategoryWithExtra } from "@/app/lib/synchronizers/extra/subcategories/listByCategory";

type Props = 
  | {
    type: "complete";
    filters?: SubcategoryFiltersParams;
    pagination?: PaginationParams;
    subcategoriesWithExtra: SubcategoryWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"items" | "category">;
    dictNotFound: string;
    fields: {
      name: InputFieldProps;
      description: InputFieldProps;
      button: DictFormButton;
      category: SelectFieldProps<"Category">;
      subcategory: SelectFieldProps<"Subcategory">;
    };
  } | {
    type: "category";
    category: Category;
    filters?: SubcategoryFiltersParams;
    pagination?: PaginationParams;
    subcategoriesWithExtra: SubcategoryWithExtra[];
    dictDialogEdit: DictDialog;
    dictDialogReplace: DictDialog;
    dictCard: DictLabelList<"items" | "category">;
    dictNotFound: string;
    fields: {
      name: InputFieldProps;
      description: InputFieldProps;
      button: DictFormButton;
      category: SelectFieldProps<"Category">;
      subcategory: SelectFieldProps<"Subcategory">;
    };
  }

// Client function to handle changes on list client side
export default function ListSubcategoriesWithExtraClient(props: Props) {
  const { type, pagination, filters, subcategoriesWithExtra, dictDialogEdit, dictDialogReplace, dictCard, dictNotFound, fields } = props;

  const [categories, setCategories] = useState(fields.category.list);
  const [subcategories, setSubcategories] = useState(fields.subcategory.list);
  const [currentSubcategoriesWithExtra, setCurrentSubcategoriesWithExtra] =
    useState(subcategoriesWithExtra);

  useEffect(() => {
    synchronizeList({
      list: categories,
      setList: setCategories,
      streamer: streamer as Worker,
      type: "Category"
    });
    synchronizeList({
      list: subcategories,
      setList: setSubcategories,
      streamer: streamer as Worker,
      type: "Subcategory"
    });

    if (type === "complete") {
      syncPaginatedSubcategoriesWithExtra({
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentSubcategoriesWithExtra,
        setList: setCurrentSubcategoriesWithExtra,
      });
    }

    if (type === "category") {
      const { category } = props;
      syncPaginatedSubcategoriesByCategoryWithExtra({
        category: category.id as string,
        filters: filters,
        pagination: pagination,
        streamer: streamer as Worker,
        list: currentSubcategoriesWithExtra,
        setList: setCurrentSubcategoriesWithExtra,
      });
    }
  }, []);

  return (
    <>
      {currentSubcategoriesWithExtra &&
        currentSubcategoriesWithExtra.map((item: SubcategoryWithExtra) => (
          <CardSubcategoryWithExtra
            type={type === "category" ? "alternative" : "default"}
            key={item.subcategory.id}
            item={item}
            dictDialogEdit={dictDialogEdit}
            dictDialogReplace={dictDialogReplace}
            dictCard={dictCard}
            fields={{
              ...fields,
              category: {
                ...fields.category,
                list: categories,
              },
              subcategory: {
                ...fields.subcategory,
                list: subcategories,
              }
            }}
          />
        ))}
      {!currentSubcategoriesWithExtra&& <><div className="p-4">{dictNotFound}</div></>}
    </>
  );
}
