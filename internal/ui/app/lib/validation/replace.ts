"use server";

/** Actions */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { FormMap, FormState } from "../types/form/form";

import { retrieveById } from "../requests/generics/retrieveById";
import validateResponse from "./response";

type RetrievableItem = Exclude<keyof FormMap,
    "ZonesBulk" |
    "AislesBulk" |
    "RacksBulk" |
    "ShelfsBulk" |
    "ItemComplete" |
    "ProductWithImages" |
    "Delete" |
    "Replace"
  >

export async function validateReplace(
  state: FormState<"Replace">,
  locale: string,
){
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.forms.messages.errors.emtpy;
    return state;
  }

  if (!state.result.itemToDelete || !state.result.itemThatReplaces) {
    state.error = true;
    state.message = dict.forms.messages.errors.emtpy;
    return state;
  }

  const checkItemToDelete = await retrieveById(
    state.result.type as RetrievableItem, 
    state.result.itemToDelete
  );
  const stateItemToDelete = await validateResponse(
    checkItemToDelete,
    state,
    locale,
  );

  if (stateItemToDelete.error) {
    state.error = true;
    state.message = dict.forms.messages.errors.empty;
    return state;
  }

  const checkItemThatReplaces = await retrieveById(
    state.result.type as RetrievableItem, 
    state.result.itemToDelete
  );
  state = await validateResponse(
    checkItemThatReplaces,
    state,
    locale,
  );

  // Here we can just return either if it's okay or not
  return state;
}
