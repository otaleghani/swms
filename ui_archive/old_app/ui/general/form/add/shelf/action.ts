"use server";

import { PostShelfs } from "@/app/lib/requests/shelfs/post";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Shelf } from "@/app/lib/types";

export type AddShelfDialogState = {
  error: true | false;
  errorMessages: {
    name: string[];
    zone: string[];
    aisle: string[];
    rack: string[];
  };
  message?: string;
  result?: Shelf;
};

export async function AddShelfDialogAction(
  currentState: AddShelfDialogState, formData: FormData) {
  const state: AddShelfDialogState = {
    error: false,
    errorMessages: {
      name: [],
      zone: [],
      aisle: [],
      rack: [],
    },
  };
  const data = {
    name: formData.get("name"),
    zone: formData.get("zone"),
    aisle: formData.get("aisle"),
    rack: formData.get("rack"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  // VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" ||
       data.name === undefined) {
      state.errorMessages.name.push(dict.shelfs.add_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.shelfs.add_dialog.errors.name.type);
    state.error = true;
  }

  // TODO: Add server side validation for zone

  if (!state.error) {
    const res_body = await PostShelfs({
      name: data.name,
      zone: data.zone,
      aisle: data.aisle,
      rack: data.rack,
    });

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        redirect("/login?error=true");
      }
      if (res_body.code === 400) {
        state.error = true;
        state.message = dict.shelfs.add_dialog.errors.general.marshal;
        return state;
      }
      if (res_body.code === 500) {
        state.error = true;
        state.message = dict.shelfs.add_dialog.errors.general.internal;
        return state;
      }

      state.error = true;
      state.message = dict.shelfs.add_dialog.errors.general.unknown;
      return state;
    }

    state.message = "everything is a-okay";
    state.result = {
      id: res_body.data.uuid as string,
      name: data.name as string,
      zone: data.zone as string,
      aisle: data.aisle as string,
      rack: data.rack as string,
    }
  }
  return state;
}
