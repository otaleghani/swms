interface ItemIdProps {
  params: {
    id: string;
  }
}

export default function Page({ params }: ItemIdProps) {
  return (
    <div className="h-screen w-full bg-red-500">{params.id}</div>
  )
}
