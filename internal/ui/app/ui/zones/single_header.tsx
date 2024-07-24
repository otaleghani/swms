import { AddBulkAisles } from "@/app/ui/aisles/bulk_add/dialog";
import { Button } from "@/components/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "../general/breadcrumbs";
import { Zone } from "@/app/lib/types";

interface SingleZoneHeaderProps {
  dict_header: any;
  dict_aisles_bulk_form: any;
  lang: string;
  zone: Zone;
}

export default function SingleZoneHeader({ 
  dict_header, 
  dict_aisles_bulk_form, 
  lang, 
  zone }: SingleZoneHeaderProps) {

  const breadcrumbs_items = [
    {
      label: dict_header.breadcrumbs.zone,
      url: "/zones",
    }
  ]

  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs items={breadcrumbs_items} current_item={zone.name} />
      </div>
      <AddBulkAisles dict={dict_aisles_bulk_form} locale={lang} zone_id={zone.id} />
    </header>
  )
}
