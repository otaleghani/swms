import Link from "next/link";
import {cache} from 'react';

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

const items: Item[] = [
  { id: "1", name: "Item 1", quantity: 10, category: "Category A" },
  { id: "2", name: "Item 2", quantity: 20, category: "Category B" },
  { id: "3", name: "Item 3", quantity: 30, category: "Category C" },
  { id: "4", name: "Item 4", quantity: 40, category: "Category D" },
  { id: "5", name: "Item 5", quantity: 50, category: "Category E" },
  { id: "6", name: "Item 6", quantity: 60, category: "Category F" },
  { id: "7", name: "Item 7", quantity: 70, category: "Category G" },
  { id: "8", name: "Item 8", quantity: 80, category: "Category H" },
  { id: "9", name: "Item 9", quantity: 90, category: "Category I" },
  { id: "10", name: "Item 10", quantity: 100, category: "Category J" },
  { id: "11", name: "Item 11", quantity: 110, category: "Category K" },
];

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getDataCached = cache(getData)

export default async function ListItem() {
  const data = getDataCached(1000).then(() => {
    return items
  })
  const [dataArray] = await Promise.all([data])

  return (
    <>
      <div className="flex flex-col gap-96">
        {dataArray.map((item: Item) => (
          <Link href={"/items/" + item.id}>{item.name}</Link>
        ))}
      </div>
    </>
  )
}
