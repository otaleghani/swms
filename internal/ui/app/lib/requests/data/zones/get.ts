"use server";

import fetchData from "../fetch";
import { Response } from "@/app/lib/types/data/misc";
import { 
  Zone,
  Zones, 
  ZonesExtended
} from "@/app/lib/types/data/zones";
import { zonesTag as tag } from "../tags";

export async function getZones(): Promise<Response<Zones>> {
  const response = await fetchData<Zones>({
    path: "zones/",
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesExtended(): Promise<Response<ZonesExtended>> {
  const response = await fetchData<ZonesExtended>({
    path: "zones/extra/",
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesById(id: string): Promise<Response<Zone>> {
  const response = await fetchData<Zone>({
    path: `zones/${id}`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesByAisle(id: string): Promise<Response<Zone>> {
  const response = await fetchData<Zone>({
    path: `aisles/${id}/zone`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesByRack(id: string): Promise<Response<Zone>> {
  const response = await fetchData<Zone>({
    path: `racks/${id}/zone`,
    method: "GET",
    tag: tag,
  });

  return response;
}

export async function getZonesByShelf(id: string): Promise<Response<Zone>> {
  const response = await fetchData<Zone>({
    path: `shelf/${id}/zone`,
    method: "GET",
    tag: tag,
  });

  return response;
}
