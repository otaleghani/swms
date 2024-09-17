"use server";

import fetchData from "../../fetch";
import { get, getWithExtra } from "../../generics/get";
import { 
  Aisle, 
  AisleRP,
  Aisles,
  AislesRP,
  AislesWithExtra,
  AislesWithExtraRP,
} from "@/app/lib/types/data/aisles";
import { aislesTag as tag } from "../../tags";


export async function getAisles(): AislesRP {
  return get("Aisles")
}

export async function getAislesWithExtra(): AislesWithExtraRP {
  return getWithExtra("AislesWithExtra")
  //const response = await fetchData<AislesWithExtra>({
  //  path: "aisles/extra/",
  //  method: "GET",
  //  tag: tag,
  //});
  //return response;
}

export async function getAislesByZone(zoneId: string): AislesRP {
  const response = await fetchData<Aisles>({
    path: `zones/${zoneId}/aisles`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getAislesWithExtraByZone(
  zoneId: string
): AislesWithExtraRP {
  const response = await fetchData<AislesWithExtra>({
    path: `zones/${zoneId}/aisles/extra`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getAisleById(id: string): AisleRP {
  const response = await fetchData<Aisle>({
    path: `aisles/${id}`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getAisleByRack(rackId: string): AisleRP {
  const response = await fetchData<Aisle>({
    path: `racks/${rackId}/aisle`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getAisleByShelf(shelfId: string): AisleRP {
  const response = await fetchData<Aisle>({
    path: `racks/${shelfId}/aisle`,
    method: "GET",
    tag: tag,
  });

  return response;
}
