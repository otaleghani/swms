"use client";

// Actions
import { useState, useEffect } from "react";
import { syncSupplierWithExtra } from "@/app/lib/synchronizers/extra/suppliers/single";

// Components
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import { CardTitle, CardDescription } from "@/app/ui/components/card";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogSupplierReplace from "../dialogs/DialogSupplierReplace";
import DialogSupplierEdit from "../dialogs/DialogSupplierEdit";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { SupplierWithExtra } from "@/app/lib/types/data/suppliers";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps, } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Eye } from "lucide-react";
import { handleStringNilValue } from "@/app/lib/utils";

interface SupplierWithExtraCardProps {
  item: SupplierWithExtra;
  dictCard: DictLabelList<"codes">;
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    button: DictFormButton;
    supplier: SelectFieldProps<"Supplier">;
  };
}

export default function CardSupplierWithExtra({
  item,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields,
}: SupplierWithExtraCardProps) {
  const [supplierWithExtra, setSupplierWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    syncSupplierWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: supplierWithExtra,
      setElement: setSupplierWithExtra,
    });
  }, []);

  const CardFooter = () => {
    return (
      <div className="flex gap-2">
        <DialogSupplierReplace 
          supplier={supplierWithExtra.supplier}
          fields={fields}
          dict={dictDialogReplace}
        />
        <DialogSupplierEdit
          supplier={supplierWithExtra.supplier}
          fields={fields}
          dict={dictDialogEdit}
        />
        <Button size="sm" asChild className="aspect-square p-0">
          <Link href={`/suppliers/${item.supplier.id}`}>
            <Eye className="w-4 h-4"/>
          </Link>
        </Button>
      </div>
    );
  };

  const CardContent = () => {
    return (
      <div>
        <div className="border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.codes}</span>
          <span>{supplierWithExtra.codesCount}</span>
        </div>
      </div>
    );
  };

  const CardHeader = () => {
    return (
      <>
        <CardTitle>
          <span className="text-2xl font-semibold tracking-tight">
            {supplierWithExtra.supplier.name}
          </span>
        </CardTitle>
        <CardDescription>{
          handleStringNilValue(supplierWithExtra.supplier.description)}
        </CardDescription>
      </>
    );
  };

  if (syncState != "hidden") {
    return (
      <>
        {
          <CardWrapper
            className={
              syncState === "remove"
                ? "animate-delete"
                : syncState === "update"
                  ? "animate-update"
                  : ""
            }
            Header={CardHeader}
            Content={CardContent}
            Footer={CardFooter}
          />
        }
      </>
    );
  }
}
