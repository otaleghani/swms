interface ItemsSinglePage {
  params: {
    id: string,
  },
}
export default function ItemsSinglePage({ params }: ItemsSinglePage) {
  return (
    <div className="">{params.id}</div>
  )
}
