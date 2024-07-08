import Link from "next/link"
import CardList from "@/app/ui/items/card";
import { DataTable } from "@/app/ui/items/table/data-table";
import { columns } from "@/app/ui/items/table/columns";
import { items } from "@/app/ui/items/table/data";

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const someData = ["1", "2", "3", "4"]

export default async function ComponentList() {
  const otherData = await getData2()

  // const data = getData(1000).then(() => {
  //   return someData
  // })
  // const [theData] = await Promise.all([data])

  return (
    <div className="xl:border-r">
      {
      // <CardList />
      }
      <DataTable columns={columns} data={items} />
      {
        // {otherData.map((data: any) => (
        //   <Link className="p-2" href={"/test/"+data.id}>{data.name}</Link>
        // ))}
        //   <Link className="p-2" href="/test/">Turn back</Link>
      }
    </div>
  )
}

async function getData2() {
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzd21zIiwic3ViIjoic29tZUB0aGluZy5jb20iLCJleHAiOjE3MjA0MzM2ODcsImlhdCI6MTcyMDQzMDA4N30.7jhXi4ofKAqkJiT0PuR8mXyKQu3VOvEWkNL1heua8bk';
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
