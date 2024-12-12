"use client";

// Actions
import { useState, useEffect } from "react";
import { synchronizeElement } from "@/app/lib/synchronizers/element";

/** Components */
import DialogVariantEdit from "../dialogs/DialogVariantEdit";
import DialogVariantDelete from "../dialogs/DialogVariantDelete";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { SyncState } from "@/app/lib/synchronizers/utils";
import { InputFieldProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { DictDialog, DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";
import { Variant } from "@/app/lib/types/data/variants";
import { Unit } from "@/app/lib/types/data/units";
import { SupplierCodes } from "@/app/lib/types/data/supplierCodes";
import DialogSupplierCodeCreate from "../../supplierCodes/dialogs/DialogSupplierCodeCreate";
import { Item } from "@/app/lib/types/data/items";
import CardSupplierCodeInVariants from "../../supplierCodes/cards/CardSupplierCodeInVariants";
import { Supplier } from "@/app/lib/types/data/suppliers";
import { Card, CardContent, CardHeader } from "@/app/ui/components/card";

interface VariantCardProps {
  item: Item,
  variant: Variant, 
  codes: SupplierCodes,
  dictCard: DictLabelList<"dimensions" | "weight" | "quantity" | "identifier">;
  dictDialogEdit: DictDialog;
  dictDialogDelete: DictDialog;
  fields: {
    name: InputFieldProps;
    description: InputFieldProps;
    identifier: InputFieldProps;
    length: InputFieldProps;
    width: InputFieldProps;
    height: InputFieldProps;
    weight: InputFieldProps;
    quantity: InputFieldProps;
    lengthUnit: SelectFieldProps<"Unit">;
    weightUnit: SelectFieldProps<"Unit">;
    item: SelectFieldProps<"Item">;
    button: DictFormButton;
  };
  supplierCodeCard: {
    dialogCreate: {
      fields: {
        code: InputFieldProps;
        supplier: SelectFieldProps<"Supplier">;
        item: SelectFieldProps<"Item">;
        variant: SelectFieldProps<"Variant">;
        button: DictFormButton;
      };
      dict: DictDialog,
    };
    dialogEdit: {
      fields: {
        code: InputFieldProps;
        supplier: SelectFieldProps<"Supplier">;
        item: SelectFieldProps<"Item">;
        variant: SelectFieldProps<"Variant">;
        button: DictFormButton;
      };
      dict: DictDialog,
    };
    dialogDelete: {
      fields: {
        button: DictFormButton;
      };
      dict: DictDialog,
    };
  };
};

export default function CardVariant({
  item,
  variant,
  codes,
  dictCard,
  dictDialogEdit,
  dictDialogDelete,
  fields,
  supplierCodeCard,
}: VariantCardProps) {
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [syncState, setSyncState] = useState("none" as SyncState);
  const [currentWeightUnit, setCurrentWeightUnit] = useState(
    fields.weightUnit.list.find(item => item.id === variant.weightUnit) as Unit
  );
  const [currentLengthUnit, setCurrentLengthUnit] = useState(
    fields.lengthUnit.list.find(item => item.id === variant.lengthUnit) as Unit
  );


  useEffect(() => {
    synchronizeElement<"Variant">({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: currentVariant,
      setElement: setCurrentVariant,
      type: "Variant"
    });
  }, []);

  useEffect(() => {
    setCurrentWeightUnit(
      fields.weightUnit.list.find(item => item.id === variant.weightUnit) as Unit
    );
    setCurrentLengthUnit(
      fields.lengthUnit.list.find(item => item.id === variant.lengthUnit) as Unit
    );
  }, [currentVariant])

  return (
    <>
      { syncState != "hidden" && (
        <Card>
          <CardContent>
            <article className={ syncState === "remove" ? "animate-delete" :
            syncState === "update" ? "animate-update" : "" }>
              <div className="flex gap-4 w-full border-b py-4 items-center">
                <CardHeader className="w-full p-0">
                  <header className="text-sm w-full">
                    <h3 className="font-semibold">{variant.name}</h3>
                    <p>{variant.description}</p>
                  </header>
                </CardHeader>

                <footer className="flex gap-2 justify-self-end">
                  <DialogVariantEdit 
                    variant={currentVariant}
                    fields={fields}
                    dict={dictDialogEdit}
                  />
                  <DialogVariantDelete 
                    dict={dictDialogDelete}
                    variant={variant}
                    fields={fields}
                  />
                  <DialogSupplierCodeCreate 
                    fields={{
                      item: {
                        ...supplierCodeCard.dialogCreate.fields.item,
                        list: [item],
                      },
                      variant: {
                        ...supplierCodeCard.dialogCreate.fields.variant,
                        list: [variant],
                      },
                      supplier: supplierCodeCard.dialogCreate.fields.supplier,
                      code: supplierCodeCard.dialogCreate.fields.code,
                      button: supplierCodeCard.dialogCreate.fields.button,
                    }}
                    supplierCode={{
                      code: "",
                      id: "",
                      supplier: "",
                      item: variant.item,
                      variant: variant.id ? variant.id : "",
                    }}
                    dict={supplierCodeCard.dialogCreate.dict}
                  />
                </footer>
              </div>
              <div className="py-4 border-b">
                <section className="grid grid-cols-3 w-full text-sm">
                  <div>
                    <h4>{dictCard.labels.dimensions} (w-h-l)</h4>
                    <p className="font-semibold">{variant.width ? variant.width / currentLengthUnit.ratio : 0
                    } x {variant.height ? variant.height / currentLengthUnit.ratio : 0
                    } x {variant.length ? variant.length / currentLengthUnit.ratio : 0
                    } ({variant.lengthUnit})</p>
                  </div>
                  <div>
                    <h4>{dictCard.labels.weight}</h4>
                    <p className="font-semibold">{ variant.weight ? variant.weight / currentWeightUnit.ratio : 0
                    } ({variant.weightUnit})</p>
                  </div>
                  <div>
                    <h4>{dictCard.labels.identifier}</h4>
                    <p className="font-semibold">{variant.identifier}</p>
                  </div>
                </section>
              </div>
              <div className="pt-4">
                <div>
                  <div className="grid grid-cols-3 text-xs py-2 border-b">
                    <div className="font-semibold">Code</div>
                    <div className="font-semibold">Supplier</div>
                    <div className="font-semibold justify-self-end">Actions</div>
                  </div>
                  {codes.map((code) => (
                    <CardSupplierCodeInVariants 
                      key={code.id}
                      supplier={supplierCodeCard.dialogCreate.fields.supplier.list.find(
                        item => item.id === code.supplier
                      ) as Supplier}
                      supplierCode={code}
                      dialogEdit={{
                        ...supplierCodeCard.dialogEdit,
                        fields: {
                          ...supplierCodeCard.dialogEdit.fields,
                          item: {
                            ...supplierCodeCard.dialogEdit.fields.item,
                            list: supplierCodeCard.dialogCreate.fields.item.list,
                          },
                          variant: {
                            ...supplierCodeCard.dialogEdit.fields.variant,
                            list: supplierCodeCard.dialogCreate.fields.variant.list,
                          },
                          supplier: {
                            ...supplierCodeCard.dialogEdit.fields.supplier,
                            list: supplierCodeCard.dialogCreate.fields.supplier.list,
                          }
                        }
                      }}
                      dialogDelete={supplierCodeCard.dialogDelete}
                    />
                  ))}
                </div>
              </div>
            </article>
          </CardContent>
        </Card>
      )}
    </>
  )
} 
