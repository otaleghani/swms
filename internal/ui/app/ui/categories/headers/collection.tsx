interface CategoryHeaderProps {
  dict: any;
  lang: string;
}

export default function CategoryHeaderSingle({ 
  dict, 
  lang 
}: CategoryHeaderProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <h1 className="font-semibold text-xl leading-none tracking-tight">{dict.header_collection.title}</h1>
    </header>
  )
}
