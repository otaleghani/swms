"use client";

// Actions
import { useState, useEffect } from "react";

// Components
import CardWrapper from "@/app/ui/wrappers/cards/CardWrapper";
import { CardTitle, CardDescription } from "@/app/ui/components/card";
import { Button } from "@/app/ui/components/button";
import Link from "next/link";
import DialogSupplierCodeDelete from "../dialogs/DialogSupplierCodeDelete";
import DialogSupplierCodeEdit from "../dialogs/DialogSupplierCodeEdit";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { SupplierCode } from "@/app/lib/types/data/supplierCodes";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps, } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Eye } from "lucide-react";
import { Item } from "@/app/lib/types/data/items";
import { synchronizeElement } from "@/app/lib/synchronizers/element";
import { Variant } from "@/app/lib/types/data/variants";
import { Supplier } from "@/app/lib/types/data/suppliers";
import LabelSupplier from "../../labels/LabelSupplier";
import LabelItem from "../../labels/LabelItem";
import LabelVariant from "../../labels/LabelVariant";

interface SupplierCodeCardProps {
  element: SupplierCode;
  dictCard: DictLabelList<"supplier" | "item" | "variant">;
  dictDialogEdit: DictDialog;
  dictDialogReplace: DictDialog;
  fields: {
    code: InputFieldProps;
    supplier: SelectFieldProps<"Supplier">;
    item: SelectFieldProps<"Item">;
    variant: SelectFieldProps<"Variant">;
    button: DictFormButton;
  };
}

export default function CardSupplierCode({
  element,
  dictCard,
  dictDialogEdit,
  dictDialogReplace,
  fields,
}: SupplierCodeCardProps) {
  const [supplierCode, setSupplierCode] 
    = useState(element);
  const [syncState, setSyncState] = useState("none" as SyncState);
  const [currentItem, setCurrentItem] = useState(fields.item.list.find(
    (e) => e.id === supplierCode.item
  ) as Item);
  const [currentVariant, setCurrentVariant] = useState(fields.variant.list.find(
    (e) => e.id === supplierCode.variant
  ) as Variant);
  const [currentSupplier, setCurrentSupplier] = useState(fields.supplier.list.find(
    (e) => e.id === supplierCode.supplier
  ) as Supplier);

  useEffect(() => {
    synchronizeElement<"SupplierCode">({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: supplierCode,
      setElement: setSupplierCode,
      type: "SupplierCode"
    })
    //syncSupplierCodeWithExtra({
    //  streamer: streamer as Worker,
    //  setSyncState: setSyncState,
    //  element: supplierCodeWithExtra,
    //  setElement: setSupplierCodeWithExtra,
    //});
  }, []);

  useEffect(() => {
    setCurrentItem(fields.item.list.find(
      (e) => e.id === supplierCode.supplier
    ) as Item);
    setCurrentVariant(fields.variant.list.find(
      (e) => e.id === supplierCode.variant
    ) as Variant);
    setCurrentSupplier(fields.supplier.list.find(
      (e) => e.id === supplierCode.supplier
    ) as Supplier);
  }, [supplierCode]);

  const CardFooter = () => {
    return (
      <div className="flex gap-2">
        <DialogSupplierCodeDelete 
          supplierCode={supplierCode}
          fields={fields}
          dict={dictDialogReplace}
        />
        <DialogSupplierCodeEdit
          supplierCode={supplierCode}
          fields={fields}
          dict={dictDialogEdit}
        />
        <Button size="sm" asChild className="aspect-square p-0">
          <Link href={`/items/${currentItem.id}`}>
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
          <span>{dictCard.labels.supplier}</span>
          <LabelSupplier 
            supplier={currentSupplier}
            setSupplier={setCurrentSupplier}
          />
        </div>
        <div className="border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.item}</span>
          <LabelItem 
            item={currentItem}
            setItem={setCurrentItem}
          />
        </div>
        <div className="border-t w-full flex justify-between py-2">
          <span>{dictCard.labels.variant}</span>
          <LabelVariant 
            variant={currentVariant}
            setVariant={setCurrentVariant}
          />
        </div>
      </div>
    );
  };

  const CardHeader = () => {
    return (
      <>
        <CardTitle>
          <span className="text-2xl font-semibold tracking-tight">
            {supplierCode.code}
          </span>
        </CardTitle>
        {
        //<CardDescription>{
        //  handleStringNilValue(supplierCodeWithExtra.supplierCode.description)}
        //</CardDescription>
        }
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
