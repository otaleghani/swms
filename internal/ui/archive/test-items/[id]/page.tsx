import Link from "next/link";
import { headers } from "next/headers";

interface ItemsSingleProps {
  params: {
    id: string,
  },
}

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function ItemsSinglePage({ params }: ItemsSingleProps) {
  const url = headers().get('next-url')
  console.log(url)
  const data = getData(1000).then(() => {
    // throw Error("sandro")
    return params.id
  })
  return (
    <div className="z-0 bg-white ">
      <div>{data}</div>
      <Link href="/test-items/" className="block h-[2000vw]">turn back</Link>
    </div>
  )
}
