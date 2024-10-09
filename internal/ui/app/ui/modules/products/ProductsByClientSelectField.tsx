
"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

/** Types and interfaces */
import { Client, emptyClient } from "@/app/lib/types/data/clients";
import { Product, emptyProduct } from "@/app/lib/types/data/products";

import { SelectFieldProps } from "@/app/lib/types/form/fields";
import { filterList } from "../../patterns/form/select/action";

export interface ProductsByClientSelectFieldsProps {
  fields: {
    client?: {
      errorMessages: string[];
      defaultValue?: Client;
      select: SelectFieldProps<"Client">;
    },
    product?: {
      errorMessages: string[];
      defaultValue?: Product;
      select: SelectFieldProps<"Product">;
    },
  }
}

export default function ProductsByClientSelectFields({
  fields
}: ProductsByClientSelectFieldsProps) {
  const [selectedClient, setSelectedClient] = useState(
    fields.client?.defaultValue ? 
      fields.client.defaultValue :
      emptyClient
  );
  const [selectedProduct, setSelectedProduct] = useState(
    fields.product?.defaultValue ? 
      fields.product.defaultValue :
    emptyProduct
  );

  const [listClient, setListClient] = useState(fields.client?.select.list);
  const [listProduct, setListProduct] = useState(fields.product?.select.list);

  const [filteredProduct, setFilteredProduct] = useState(fields.product?.select.list);

  useEffect(() => {
    if (listProduct) {
      if (selectedProduct.client !== selectedClient.id) {
        setSelectedProduct(emptyProduct);
        filterList(listProduct, "client", selectedClient.id, setFilteredProduct);
      }
    }
  }, [selectedClient])

  return (
    <div>
      <div>
        {fields.client && listClient && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Client"> 
              name="Client"
              element={selectedClient}
              setElement={setSelectedClient}
              list={listClient}
              errorMessages={fields.client.errorMessages}
              dict={fields.client.select.dict}
            />
          </div>
        )}
        {fields.product && filteredProduct && (selectedClient != emptyClient) && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Product"> 
              name="Product"
              element={selectedProduct}
              setElement={setSelectedProduct}
              list={filteredProduct}
              errorMessages={fields.product.errorMessages}
              dict={fields.product.select.dict}
            />
          </div>
        )}
      </div>
    </div>
  )
}
