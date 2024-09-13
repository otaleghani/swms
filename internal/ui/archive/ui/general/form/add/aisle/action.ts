"use server";

import { PostAisles } from "@/app/lib/requests/aisles/post";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Zone, Aisle } from "@/app/lib/types";

export type AddAisleDialogState = {
  error: true | false;
  errorMessages: {
    name: string[];
    zone: string[];
  };
  message?: string;
  result?: Aisle;
};

export async function AddAisleDialogAction(
  currentState: AddAisleDialogState, formData: FormData) {
  const state: AddAisleDialogState = {
    error: false,
    errorMessages: {
      name: [],
      zone: [],
    },
  };
  const data = {
    name: formData.get("name"),
    zone: formData.get("zone"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  // VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" ||
       data.name === undefined) {
      state.errorMessages.name.push(dict.aisles.add_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.aisles.add_dialog.errors.name.type);
    state.error = true;
  }

  // TODO: Add server side validation for zone

  if (!state.error) {
    const res_body = await PostAisles({
      name: data.name,
      zone: data.zone,
    } as Aisle);

    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        redirect("/login?error=true");
      }
      if (res_body.code === 400) {
        state.error = true;
        state.message = dict.aisles.add_dialog.errors.general.marshal;
        return state;
      }
      if (res_body.code === 500) {
        state.error = true;
        state.message = dict.aisles.add_dialog.errors.general.internal;
        return state;
      }

      state.error = true;
      state.message = dict.aisles.add_dialog.errors.general.unknown;
      return state;
    }

    state.message = "everything is a-okay";
    state.result = {
      id: res_body.data.uuid as string,
      name: data.name as string,
      zone: data.zone as string,
    }
  }
  return state;
}
