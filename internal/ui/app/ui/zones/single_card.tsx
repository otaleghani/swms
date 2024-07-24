import { Zone } from "@/app/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { DeleteZoneDialog } from "./delete/dialog";
import { EditZones } from "./edit/dialog";

interface SingleZoneCardProps {
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  zone: Zone;
  aisles_count: number;
  items_count: number;
}

export default function SingleZoneCard({ 
  locale,
  zone,
  dict_card,
  dict_edit,
  dict_delete,
  aisles_count,
  items_count }: SingleZoneCardProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{zone.name}</span></CardTitle>
          <CardDescription>{zone.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-y"><span>{dict_card.labels.aisles}</span><span>{aisles_count}</span></div>
          <div className="flex justify-between py-2 border-b"><span>{dict_card.labels.items}</span><span>{items_count}</span></div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          <DeleteZoneDialog dict={dict_delete} id={zone.id}/>
          <EditZones dict={dict_edit} locale={locale} zone={zone} />
        </CardFooter>
      </Card>
    </>
  )
}
