"use client" 

/** React hooks */
import { useState, useEffect } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { Client, emptyClient } from "@/app/lib/types/data/clients";
import { SelectFieldProps } from "@/app/lib/types/form/fields";
import DialogFormPattern, { DialogFormPatternProps } from "../../patterns/dialog/DialogFormPattern";

import { addNewItemToList } from "../../patterns/form/select/action";

export interface TagsSelectFieldsWithAddProps {
  fields: {
    client?: {
      errorMessages: string[];
      select: SelectFieldProps<"Client">;
      formDialog: DialogFormPatternProps<"Client">;
    },
  }
}

export default function ClientSelectFieldsWithAdd({
  fields
}: TagsSelectFieldsWithAddProps) {
  const [selectedClient, setSelectedClient] = useState(emptyClient);
  const [listClient, setListClient] = useState(fields.client?.select.list);

  const refreshClientList = (item: Client) => {
    addNewItemToList(item, listClient, setListClient);
    setSelectedClient(item);
  };

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
      </div>
    </div>
  )
}
