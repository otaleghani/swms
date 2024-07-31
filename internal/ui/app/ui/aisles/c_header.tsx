import { AddBulkAisles } from "@/app/ui/aisles/bulk_add/dialog";

interface AislesHeaderProps {
  dict: any;
  lang: string;
}

export default function AislesCollectionHeader({ dict, lang }: AislesHeaderProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <h1 className="font-semibold text-xl leading-none tracking-tight">{dict.header_collection.title}</h1>
      {
      //<AddBulkAisles  
      //  dict={dict.bulk_form} 
      //  locale={lang} />
      }
    </header>
  )
}
