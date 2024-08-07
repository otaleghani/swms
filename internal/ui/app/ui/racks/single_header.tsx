import { AddBulkShelfsDialog } from "@/app/ui/shelfs/bulk_add/dialog";
import { Breadcrumbs } from "../general/breadcrumbs";
import { Aisle, Rack, Zone } from "@/app/lib/types";

interface SingleRackHeaderProps {
  dict_header: any;
  dict_shelfs_bulk_form: any;
  lang: string;
  zone: Zone;
  aisle: Aisle;
  rack: Rack;
}

export default function SingleRackHeader({ 
  dict_header, 
  dict_shelfs_bulk_form, 
  lang, 
  zone,
  aisle,
  rack }: SingleRackHeaderProps) {

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
    },
    {
      label: dict_header.breadcrumbs.rack,
      url: "/racks",
    }
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs items={breadcrumbs_items} current_item={rack.name} />
      </div>
      <AddBulkShelfsDialog 
        dict={dict_shelfs_bulk_form} 
        locale={lang} 
        rack={rack} />
    </header>
  )
}
