import { AddBulkZones } from "@/app/ui/zones/bulk_add/dialog";

interface ZoneHeaderProps {
  dict: {
    title: string;
    bulk_form: any;
  };
  lang: string
}

export default function ZoneHeader({ dict, lang }: ZoneHeaderProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <h1 className="font-semibold text-xl leading-none tracking-tight">{dict.title}</h1>
      <AddBulkZones dict={dict.bulk_form} locale={lang} />
    </header>
  )
}
