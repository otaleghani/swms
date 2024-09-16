"use server";

import { Zone, ZoneFormState, defaultZoneFormState } from "@/app/lib/types/data/zones";

export default async function zoneAddFormAction(
  currentState: ZoneFormState,
  formData: FormData
) {
  const state = defaultZoneFormState;
  const { name, locale } = Object.fromEntries(formData.entries());


  return state;
}
