import { Breadcrumbs } from "../general/breadcrumbs";
import { Aisle, Rack, Zone, Shelf } from "@/app/lib/types";

interface SingleRackHeaderProps {
  dict_header: any;
  zone: Zone;
  aisle: Aisle;
  rack: Rack;
  shelf: Shelf;
}

export default function SingleShelfHeader({ 
  dict_header, 
  zone,
  aisle,
  rack,
  shelf }: SingleRackHeaderProps) {

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
      label: aisle.name,
      url: `/aisles/${aisle.id}`,
    },
    {
      label: dict_header.breadcrumbs.rack,
      url: "/racks",
    },
    {
      label: rack.name,
      url: `/racks/${rack.id}`,
    },
    {
      label: dict_header.breadcrumbs.shelf,
      url: "/shelfs/",
    },
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs items={breadcrumbs_items} current_item={shelf.name} />
      </div>
    </header>
  )
}
