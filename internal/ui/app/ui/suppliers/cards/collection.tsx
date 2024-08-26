import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { EditSupplierDialog } from "./edit/dialog";
import DeleteAndSubSupplierDialog from "./delete/dialog"
import { SupplierInfo } from "@/app/lib/types"

interface SupplierCardsCollectionProps {
  suppliers: SupplierInfo[];
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
}

export default function SupplierCardsCollection({
  suppliers,
}: SupplierCardsCollectionProps) {
  return (
    <div>
      {suppliers.map((item) => (
        <div>
          {item.supplier.name}
        </div>
      ))}
    </div>
  )
}
