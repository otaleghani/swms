import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { ZoneInfo } from "@/app/lib/types";
import { EditZones } from "./edit/dialog";
import { DeleteZoneDialog } from "./delete/dialog";

interface ZoneCardProps {
  zones: ZoneInfo[];
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
}

export default function CollectionZonesCards({ 
  zones, 
  locale, 
  dict_card, 
  dict_edit, 
  dict_delete 
}: ZoneCardProps) {
  return (
    <>
      {zones.map((zone: ZoneInfo) => (
        <Card>
          <CardHeader>
            <CardTitle>{zone.zone.name}</CardTitle>
            <CardDescription>{zone.zone.id}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="flex justify-between py-2 border-y"><span>{dict_card.labels.aisles}</span><span>{zone.aisles_count}</span></div>
            <div className="flex justify-between py-2 border-b"><span>{dict_card.labels.items}</span><span>{zone.items_count}</span></div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 text-sm">
            <DeleteZoneDialog dict={dict_delete} id={zone.zone.id}/>
            <EditZones dict={dict_edit} locale={locale} zone={zone.zone} />
            <Button asChild variant="default">
              <Link href={`/zones/${zone.zone.id}`}>{dict_card.labels.view}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
