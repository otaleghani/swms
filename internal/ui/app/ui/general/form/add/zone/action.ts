"use server";

import { PostZone } from "@/app/lib/requests/zones/post";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type AddZoneDialogState = {
  error: true | false;
  errorMessages: {
    name: string[];
    description: string[];
  };
  message?: string;
  result?: {
    id: string;
    name: string;
  };
};

export async function AddZoneDialogAction(
  currentState: AddZoneDialogState, formData: FormData) {
  const state: AddZoneDialogState = {
    error: false,
    errorMessages: {
      name: [],
      description: [],
    },
  };
  const data = {
    name: formData.get("name"),
    locale: formData.get("locale"),
  }

  const dictPromise = getDictionary(data.locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  // VALIDATION
  if (typeof data.name === "string") {
    if (data.name === "" ||
       data.name === undefined) {
      state.errorMessages.name.push(dict.zones.add_dialog.errors.name.empty);
      state.error = true;
    }
  } else {
    state.errorMessages.name.push(dict.zones.add_dialog.errors.name.type);
    state.error = true;
  }

  if (!state.error) {
    const req_body = JSON.stringify({
      name: data.name,
    });
    const jwt = cookies().get("access")?.value;
    const res_body = await PostZone(req_body);

    console.log(res_body)
    if (res_body.code !== 201) {
      if (res_body.code === 401) {
        redirect("/login?error=true");
      }
      if (res_body.code === 400) {
        state.error = true;
        state.message = dict.zones.add_dialog.errors.general.marshal;
        return state;
      }
      if (res_body.code === 500) {
        state.error = true;
        state.message = dict.zones.add_dialog.errors.general.internal;
        return state;
      }

      state.error = true;
      state.message = dict.zones.add_dialog.errors.general.unknown;
      return state;
    }

    state.message = "everything is a-okay";
    state.result = {
      id: res_body.data.uuid as string,
      name: data.name as string,
    }
  }
  return state;
}
