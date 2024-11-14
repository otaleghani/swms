"use client";

// Actions
import { useState, useEffect } from "react";
import { syncSupplierWithExtra } from "@/app/lib/synchronizers/extra/suppliers/single";

// Components
import { Warehouse } from "lucide-react";
import FetchToastPattern from "../../patterns/FetchToast";

// Worker
import streamer from "@/app/lib/workers";

// Types and interfaces
import { SupplierWithExtra } from "@/app/lib/types/data/suppliers";
import { SyncState } from "@/app/lib/synchronizers/utils";
import { DictLabelList } from "@/app/lib/types/dictionary/misc";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";

interface Props {
  item: SupplierWithExtra;
  dictCard: DictLabelList<"codes">;
  dictToast: DictFetchingToasts;
}

export default function HeroSupplierSingle({
  item,
  dictCard,
  dictToast
}: Props) {
  const [supplierWithExtra, setSupplierWithExtra] = useState(item);
  const [syncState, setSyncState] = useState("none" as SyncState);

  useEffect(() => {
    // What happens if this is the element deleted?
    syncSupplierWithExtra({
      streamer: streamer as Worker,
      setSyncState: setSyncState,
      element: supplierWithExtra,
      setElement: setSupplierWithExtra,
    });
  }, []);

  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        {supplierWithExtra.supplier.name}
      </h1>
      <span className="font-light">{supplierWithExtra.supplier.id}</span>
      <div className="grid xl:grid-cols-2 gap-2 pt-4">

        <div className="border rounded-lg p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                {dictCard.labels.codes}
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              {supplierWithExtra.codesCount}
            </div>
          </div>
        </div>
      </div>
      <FetchToastPattern 
        type="Supplier"
        dict={dictToast}
        id={supplierWithExtra.supplier.id as string}
      />
    </header>
  )
}
