interface PageProps {
  params: {
    id: string;
  }
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <h1>{params.id}</h1>
    </>
  )
}
