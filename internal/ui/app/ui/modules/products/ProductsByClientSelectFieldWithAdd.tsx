"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Client, emptyClient } from "@/app/lib/types/data/clients";
import { Product, emptyProduct } from "@/app/lib/types/data/products";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

import { filterList, addNewItemToList } from "../../patterns/form/select/action";

export interface TagsSelectFieldsWithAddProps {
  fields: {
    client?: {
      errorMessages: string[];
      defaultValue?: Client;
      select: SelectFieldProps<"Client">;
      formDialog: DialogFormPatternProps<"Client">;
    },
    product?: {
      errorMessages: string[];
      defaultValue?: Product;
      select: SelectFieldProps<"Product">;
      formDialog: DialogFormPatternProps<"Product">;
    },
  }
}

export default function TagsSelectFieldsWithAdd({
  fields
}: TagsSelectFieldsWithAddProps) {
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

  const refreshClientList = (item: Client) => {
    addNewItemToList(item, listClient, setListClient);
    setSelectedClient(item);
  };

  const refreshProductList = (item: Product) => {
    addNewItemToList(item, listProduct, setListProduct);
    setSelectedProduct(item);
  };

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
            <DialogFormPattern<"Client"> 
              self={fields.client.formDialog.self}
              formPattern={{
                ...fields.client.formDialog.formPattern,
                form: {
                  ...fields.client.formDialog.formPattern.form,
                  refreshItemList: refreshClientList,
                }
              }}
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
            <DialogFormPattern<"Product"> 
              self={fields.product.formDialog.self}
              formPattern={{
                ...fields.product.formDialog.formPattern,
                form: {
                  ...fields.product.formDialog.formPattern.form,
                  refreshItemList: refreshProductList,
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
