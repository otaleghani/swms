"use client";

// Actions
import { useState, useEffect } from "react";
import { syncSubcategoryWithExtra } from "@/app/lib/synchronizers/extra/subcategories/single";

// Components
import { CardTitle, CardDescription } from "@/app/ui/components/card";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogSubcagegoryReplace from "../dialogs/DialogSubcategoryReplace";
import DialogSubcategoryEdit from "../dialogs/DialogSubcategoryEdit";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { SubcategoryWithExtra } from "@/app/lib/types/data/subcategories";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps, } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Eye } from "lucide-react";

interface SubcagegoryWithExtraCardProps {
  item: SubcategoryWithExtra;
  dictCard: DictLabelList<"items">;
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    category: SelectFieldProps<"Category">;
    subcategory: SelectFieldProps<"Subcategory">;
  };
}

export default function CardSubcategoryWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields,
}: SubcagegoryWithExtraCardProps) {
  const [subcategoryWithExtra, setSubcategoryWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    syncSubcategoryWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: subcategoryWithExtra,
      setElement: setSubcategoryWithExtra,
    });
  }, []);

  const CardFooter = () => {
    return (
      <div className="flex gap-2 xl:justify-self-end">
        <DialogSubcagegoryReplace 
          subcategory={subcategoryWithExtra.subcategory}
          fields={fields}
          dict={dictDialogReplace}
        />
        <DialogSubcategoryEdit
          subcategory={subcategoryWithExtra.subcategory}
          fields={fields}
          dict={dictDialogEdit}
        />
        <Button size="sm" asChild className="aspect-square p-0">
          <Link href={`/subcategories/${item.subcategory.id}`}>
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
          <div className="text-gray-500 text-sm xl:text-right">{dictCard.labels.items}</div>
          <div className="font-semibold text-xl xl:text-right">{subcategoryWithExtra.itemsCount}</div>
        </div>
      </div>
    );
 };

  const CardHeader = () => {
    return (
      <div>
        <CardTitle>
          <span className="text-2xl font-semibold tracking-tight">
            {subcategoryWithExtra.subcategory.name}
          </span>
        </CardTitle>
        <CardDescription>{subcategoryWithExtra.subcategory.description}</CardDescription>
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
