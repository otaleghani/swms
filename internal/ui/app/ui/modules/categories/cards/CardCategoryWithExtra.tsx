"use client";

// Actions
import { useState, useEffect } from "react";
import { syncCategoryWithExtra } from "@/app/lib/synchronizers/extra/categories/single";

// Components
import { CardTitle, CardDescription } from "@/app/ui/components/card";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogCategoryReplace from "../dialogs/DialogCategoryReplace";
import DialogCategoryEdit from "../dialogs/DialogCategoryEdit";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { CategoryWithExtra } from "@/app/lib/types/data/categories";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps, } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Eye } from "lucide-react";
import { handleStringNilValue } from "@/app/lib/utils";

interface CategoryWithExtraCardProps {
  item: CategoryWithExtra;
  dictCard: DictLabelList<"items" | "subcategories">;
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    category: SelectFieldProps<"Category">;
  };
}

export default function CardCategoryWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields,
}: CategoryWithExtraCardProps) {
  const [categoryWithExtra, setCategoryWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    syncCategoryWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: categoryWithExtra,
      setElement: setCategoryWithExtra,
    });
  }, []);

  const CardFooter = () => {
    return (
      <div className="flex gap-2 xl:justify-self-end">
        <DialogCategoryReplace 
          category={categoryWithExtra.category}
          fields={fields}
          dict={dictDialogReplace}
        />
        <DialogCategoryEdit
          category={categoryWithExtra.category}
          fields={fields}
          dict={dictDialogEdit}
        />
        <Button size="sm" asChild className="aspect-square p-0">
          <Link href={`/categories/${item.category.id}`}>
            <Eye className="w-4 h-4"/>
          </Link>
        </Button>
      </div>
    );
  };

  const CardContent = () => {
    return (
      <div className="grid grid-cols-2 justify-between">
        <div className="py-2">
          <div className="text-gray-500 text-sm xl:text-right">{dictCard.labels.subcategories}</div>
          <div className="font-semibold text-xl xl:text-right">{categoryWithExtra.subcategoriesCount}</div>
        </div>
        <div className="py-2">
          <div className="text-gray-500 text-sm xl:text-right">{dictCard.labels.items}</div>
          <div className="font-semibold text-xl xl:text-right">{categoryWithExtra.itemsCount}</div>
        </div>
      </div>
    );
 };

  const CardHeader = () => {
    return (
      <div>
        <CardTitle>
          <span className="text-2xl font-semibold tracking-tight">
            {categoryWithExtra.category.name}
          </span>
        </CardTitle>
        <CardDescription>
          {handleStringNilValue(categoryWithExtra.category.description)}
        </CardDescription>
      </div>
    );
  };

  if (syncState != "hidden") {
    return (
      <div
        className={
          syncState === "remove"
            ? "animate-delete"
            : syncState === "update"
              ? "animate-update"
              : ""
        }
      >
        <div className="grid xl:grid-cols-3 gap-2 border-b items-center p-4">
          <CardHeader />
          <CardContent />
          <CardFooter />
        </div>
      </div>
    );
  }
}
