import Link from "next/link"

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const someData = ["1", "2", "3", "4"]

export default async function ComponentList() {
  const data = getData(1000).then(() => {
    return someData
  })
  const [theData] = await Promise.all([data])
  console.log(theData)

  return (
    <div className="flex flex-col gap-4">
      {theData.map((data: string) => (
        <Link className="p-2" href={"/test/"+data}>{data}</Link>
      ))}
        <Link className="p-2" href="/test/">Turn back</Link>
    </div>
  )
}
