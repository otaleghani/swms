
"use server";

/** Actions */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { FormMap, FormState } from "../types/form/form";

import { retrieveById } from "../requests/generics/retrieveById";
import validateResponse from "./response";

type Testone = Exclude<keyof FormMap,
    "ZonesBulk" |
    "AislesBulk" |
    "RacksBulk" |
    "ShelfsBulk" |
    "ItemComplete" |
    "ProductWithImages" |
    "Delete" |
    "Replace"
  >

export async function validateDelete(
  state: FormState<"Delete">,
  locale: string,
){
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.emtpy;
    return state;
  }

  if (state.result.id) {
    const response = await retrieveById(
      state.result.type as Testone, 
      state.result.id
    );
    state = await validateResponse(
      response,
      state,
      locale,
    );
  }

  // if a-okay we just return, because if it was a good retrieve it 
  // means that the id was a-okay
  return state;
}