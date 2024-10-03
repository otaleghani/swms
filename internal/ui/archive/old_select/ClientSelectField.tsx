"use client" 

/** React hooks */
import { useState } from "react";

/** Local components */
import SelectFieldPattern from "../../patterns/form/select/SelectFieldPattern";

import { emptyClient } from "@/app/lib/types/data/clients";
import { SelectFieldProps } from "@/app/lib/types/form/fields";

export interface ClientSelectFieldsProps {
  fields: {
    client?: {
      errorMessages: string[];
      select: SelectFieldProps<"Client">;
    },
  }
}

export default function ClientSelectFields({
  fields
}: ClientSelectFieldsProps) {
  const [selectedClient, setSelectedClient] = useState(emptyClient);

  return (
    <div>
      <div>
        {fields.client && (
          <div className="flex gap-4 items-end">
            <SelectFieldPattern<"Client"> 
              name="Client"
              element={selectedClient}
              setElement={setSelectedClient}
              list={fields.client.select.list}
              errorMessages={fields.client.errorMessages}
              dict={fields.client.select.dict}
            />
          </div>
        )}
      </div>
    </div>
  )
}
