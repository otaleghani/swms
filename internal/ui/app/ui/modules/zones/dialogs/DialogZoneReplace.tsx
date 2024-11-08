"use client"

import { useState, useEffect } from "react";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import streamer from "@/app/lib/workers";

// Actions
import { replaceFormAction } from "@/app/lib/actions/replace/replaceFormAction";

// Components
import DialogFormPattern from "@/app/ui/patterns/dialog/DialogFormPattern"

// Types and interfaces
import { Zone } from "@/app/lib/types/data/zones";

// Default values
import { fieldsDefaultProps, SelectFieldProps } from "@/app/lib/types/form/fields";
import { defaultReplaceFormState } from "@/app/lib/types/data/replacer";
import { DictDialog } from "@/app/lib/types/dictionary/misc";
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface Props {
  zone: Zone;
  dict: DictDialog;
  fields: {
    zone: SelectFieldProps<"Zone">;
    button: DictFormButton;
  }
}

export default function DialogZoneReplace({
  zone,
  fields,
  dict
}: Props) {
  const [currentList, setCurrentList] = useState(fields.zone.list);

  useEffect(() => {
    synchronizeList<"Zone">({
      streamer: streamer as Worker,
      list: currentList,
      setList: setCurrentList,
      type: "Zone",
    });
  }, []);

  return (
    <>
      <DialogFormPattern<"Replace">
        showButton
        self={{
          triggerType: "iconDelete",
          dict: dict,
        }}
        formPattern={{
          type: "Replace",
          self: {
            fields: {
              ...fieldsDefaultProps,
              id: zone.id as string,
              zone: {
                ...fields.zone,
                list: currentList,
              },
              button: fields.button
            },
          },
          form: {
            formName: "replaceZone" + zone.id as string,
            formAction: replaceFormAction,
            initialState: {
              ...defaultReplaceFormState,
              result: {
                itemToDelete: zone.id ? zone.id : "",
                itemThatReplaces: "",
                type: "Zone",
              },
            },
          },
        }}
      />
    </>
  )
}
