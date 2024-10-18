import { retrieve } from "@/app/lib/requests/generics/retrieve"


export default async function FilterZone(items: any) {
  const zones = await retrieve("Zones");

  return (
    <>
    {
      // This would be the client component that handles the changes
    }
      <FilterPatter
        type="zones"
        items={zones}
        filteredList={items}
      />
    </>
  )
}
