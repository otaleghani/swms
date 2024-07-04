interface ItemsProps {
  list: React.ReactNode;
  single: React.ReactNode;
}

export default function ItemsLayout({ list, single }: ItemsProps) {

  return (
    <div className="grid xl:grid-cols-2">
      <div className="">
        {list}
      </div>
      <div className="">
        {single}
      </div>
    </div>
  )
}
