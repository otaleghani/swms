import { ItemsDataTable } from "@/app/ui/items/list/table/data-table";
import { columns } from "@/app/ui/items/list/table/columns";
import { items } from "@/app/ui/items/list/table/data";

// Here I will pass the things from the page
// here I would do the filtering by http

export default async function ItemList() {
  const otherData = await getData2()

  return (
    <div className="xl:border-r">
      <ItemsDataTable columns={columns} data={items} />
    </div>
  )
}

async function getData2() {
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzd21zIiwic3ViIjoic29tZUB0aGluZy5jb20iLCJleHAiOjE3MjA1OTg4MTgsImlhdCI6MTcyMDU5NTIxOH0.Gwr528inqGNmCBllkgVmycAtmRfkVBdji4rwgKF3J5s';
  const res = await fetch('http://localhost:8080/api/v1/items', { 
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    next: { 
      tags: ['collection'],
      revalidate: 60,
    },
  });
  const data = await res.json()
  return data.data
}
