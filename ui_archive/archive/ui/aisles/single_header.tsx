import { AddBulkRacks } from "@/app/ui/racks/bulk_add/dialog";
import { Breadcrumbs } from "../general/breadcrumbs";
import { Aisle, Zone } from "@/app/lib/types";

interface SingleAisleHeaderProps {
  dict_header: any;
  dict_racks_bulk_form: any;
  lang: string;
  zone: Zone;
  aisle: Aisle;
}

export default function SingleAisleHeader({ 
  dict_header, 
  dict_racks_bulk_form, 
  lang, 
  zone,
  aisle }: SingleAisleHeaderProps) {

  const breadcrumbs_items = [
    {
      label: dict_header.breadcrumbs.zone,
      url: "/zones",
    },
    {
      label: zone.name,
      url: `/zones/${zone.id}`,
    },
    {
      label: dict_header.breadcrumbs.aisle,
      url: "/aisles",
    }
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs items={breadcrumbs_items} current_item={aisle.name} />
      </div>
      <AddBulkRacks 
        dict={dict_racks_bulk_form} 
        locale={lang} 
        aisle={aisle} />
    </header>
  )
}
