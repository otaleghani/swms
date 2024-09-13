/** Types */
import { Variant, SupplierCode, Supplier } from "@/app/lib/types";

/** components */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"
import VariantEditSheet from "../edit/sheet";
import { DeleteVariantDialog } from "../delete/dialog";

interface VariantsTableProps {
  locale: string;
  variants: Variant[];

  dict: any;
  dict_form_fields: any;
  dict_variant_delete_dialog: any;
  dict_variant_edit_dialog: any;
  dict_supplier_add_dialog: any;
  dict_supplier_code_delete_dialog: any;
  dict_supplier_code_edit_dialog: any;

  suppliers: Supplier[];

  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
  setCodes: React.Dispatch<React.SetStateAction<SupplierCode[]>>;

  codes: SupplierCode[];
}

export default function VariantsTable({
  locale,
  variants,

  dict,
  dict_form_fields,
  dict_variant_delete_dialog,
  dict_variant_edit_dialog,
  dict_supplier_add_dialog,
  dict_supplier_code_delete_dialog,
  dict_supplier_code_edit_dialog,

  suppliers,

  setVariants,
  setCodes,

  codes,
}: VariantsTableProps) {
  console.log(codes)
  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="!bg-white">
          <TableHead className="">{dict.table.header.name}</TableHead>
          <TableHead>{dict.table.header.identifier}</TableHead>
          <TableHead>{dict.table.header.quantity}</TableHead>
          <TableHead>{dict.table.header.dimensions}</TableHead>
          <TableHead className="text-right">{dict.table.header.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {variants.length === 0 || variants[0] === undefined ? (
          <TableRow className="!bg-white">
            <TableCell>Nessuna variante</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>) : (
          variants.map((variant: Variant) => (
            <TableRow className="!bg-white" key={variant.identifier + variant.name}>
              <TableCell className="font-medium">{variant.name}</TableCell>
              <TableCell>{variant.identifier}</TableCell>
              <TableCell>{variant.quantity}</TableCell>
              <TableCell>{variant.width} x {variant.length} x {variant.heigth}, {variant.weight}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <VariantEditSheet 
                    locale={locale}

                    dict_form_fields={dict_form_fields}
                    dict_variant_edit_dialog={dict_variant_edit_dialog}
                    dict_supplier_add_dialog={dict_supplier_add_dialog}
                    dict_supplier_code_delete_dialog={dict_supplier_code_delete_dialog}
                    dict_supplier_code_edit_dialog={dict_supplier_code_edit_dialog}

                    suppliers={suppliers}
                    setVariants={setVariants}
                    setCodes={setCodes}

                    variant={variant}
                    codes={codes.filter(code => code.variant === variant.id)}
                  />
                  <DeleteVariantDialog
                    dict={dict_variant_delete_dialog}
                    dict_general_form={dict_form_fields}
                    variant={variant}
                    setCodes={setCodes}
                    setVariants={setVariants}
                  />
                </div>

              </TableCell>
            </TableRow>
          ))
        )}

      </TableBody>
    </Table>
  )
}

