import { getAislesByZoneId } from "@/app/lib/requests/aisles/get";
import { getZoneById } from "@/app/lib/requests/zones/get";

interface ZoneIdPageProps {
  params: {
    id: string;
  }
}

export default async function ZoneIdPage({ params }: ZoneIdPageProps) {
  const promiseZoneData = getZoneById(params.id);
  const promiseAislesOfZone = getAislesByZoneId(params.id);
  const [zoneData, aislesOfZone] = await Promise.all([promiseZoneData, promiseAislesOfZone]);
  console.log(aislesOfZone)
  
  return (
    <>
      <div>{zoneData.name}</div>
      <div>{aislesOfZone.map((item: any) => (
        <div>{item.id}</div>
      ))}</div>
    </>
  )
}


