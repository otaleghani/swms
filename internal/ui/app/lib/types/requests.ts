import { 
  Zone, 
  Zones, 
  ZoneWithExtra,
  ZonesWithExtra 
} from "./data/zones";

import { 
  Aisle, 
  Aisles, 
  AisleWithExtra,
  AislesWithExtra 
} from "./data/aisles";
import { Racks } from "./data/racks";

/** Maps every type that can be encountered in a request.
  */
export type TypeMap = {
  Zone: Zone;
  Zones: Zones
  ZoneWithExtra: ZoneWithExtra;
  ZonesWithExtra: ZonesWithExtra;

  Aisle: Aisle;
  Aisles: Aisles;
  AisleWithExtra: AisleWithExtra;
  AislesWithExtra: AislesWithExtra;

  Racks: Racks;
}
export type ValidType<K extends string> = K extends keyof TypeMap ? K : never;

/** Used to define the request options, so the parameters used 
  * to make said request.
  *
  * @type defines the return type of the function
  * */
export type RequestOptions = {
  path: string;
  type: keyof TypeMap;
}
