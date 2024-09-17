"use server";

import fetchData from "../../fetch";
import { Response } from "@/app/lib/types/data/misc";
import { 
  Zone,
  ZoneRP,
  Zones, 
  ZonesRP,
  ZonesWithExtra,
  ZonesWithExtraRP,
} from "@/app/lib/types/data/zones";
import { zonesTag as tag } from "../../tags";

export async function getZones(): ZonesRP {
  const response = await fetchData<Zones>({
    path: "zones/",
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesWithExtra(): ZonesWithExtraRP {
  const response = await fetchData<ZonesWithExtra>({
    path: "zones/extra/",
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesById(id: string): ZoneRP {
  const response = await fetchData<Zone>({
    path: `zones/${id}`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesByAisle(id: string): ZoneRP {
  const response = await fetchData<Zone>({
    path: `aisles/${id}/zone`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesByRack(id: string): ZoneRP {
  const response = await fetchData<Zone>({
    path: `racks/${id}/zone`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesByShelf(id: string): ZoneRP {
  const response = await fetchData<Zone>({
    path: `shelf/${id}/zone`,
    method: "GET",
    tag: tag,
  });

  return response;
}
