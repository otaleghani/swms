interface ZoneIdPageProps {
  params: {
    id: string;
  }
}

export default function ZoneIdPage({ params }: ZoneIdPageProps) {
  // Here I would have to get the data of zone AND aisles
  return (
    <>
      <div>zone id {params.id}</div>
      <div>list of aisles...</div>
    </>
  )
}
