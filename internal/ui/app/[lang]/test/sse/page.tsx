import { retrieve } from "@/app/lib/requests/generics/retrieve";
import Componente from "./componente";
import { Zones } from "@/app/lib/types/data/zones";
import streamer from "@/app/lib/workers";


export default async function Page() {
  const pZones = retrieve("Zones");
  const [zones] = await Promise.all([pZones]);

  return (
    <>
      <Componente zones={zones.data as Zones} />
    </>
  )
}
