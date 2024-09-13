interface SupplierCodesHeaderCollectionProps {
  dict_header: any;
  items_count: number;
  locale: string;
}

export default function SupplierCodesHeaderCollection({ 
  dict_header, 
  items_count, 
  locale, 
}: SupplierCodesHeaderCollectionProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center text-sm">
        <span>{`${dict_header.items}: ${items_count}`}</span>
      </div>
    </header>
  )
}
