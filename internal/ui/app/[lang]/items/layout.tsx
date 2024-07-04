import { headers } from 'next/headers';

interface ItemsProps {
  list: React.ReactNode;
  single: React.ReactNode;
}

export default function ItemsLayout({ list, single }: ItemsProps) {
  //console.log(headers().get('next-url'))
  return (
    <div className="grid xl:grid-cols-2">
        {list}
        {single}
    </div>
  )
}
