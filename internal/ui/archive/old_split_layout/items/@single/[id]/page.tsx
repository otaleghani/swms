interface SingleItemProps {
  params: {
    id: string
  }
}

async function getData(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function SingleItemIdPage({ params }: SingleItemProps) {
  const data = getData(1000).then(() => {
    // throw Error("sandro")
    return params.id
  })
  return (
    <>
      <div className="bg-blue-300">{data}</div>
    </>
  )
}
