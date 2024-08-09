import { Zone } from "@/app/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { EditZones } from "./edit/dialog";
import { DeleteAndSubZoneDialog } from "./delete_safe/dialog";

interface SingleZoneCardProps {
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  item: Zone;
  zones: Zone[];
  aisles_count: number;
  items_count: number;
}

export default function SingleZoneCard({ 
  locale,
  item,
  zones,
  dict_card,
  dict_edit,
  dict_delete,
  dict_zone_select,
  aisles_count,
  items_count }: SingleZoneCardProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{item.name}</span></CardTitle>
          <CardDescription>{item.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-y"><span>{dict_card.labels.aisles}</span><span>{aisles_count}</span></div>
          <div className="flex justify-between py-2 border-b"><span>{dict_card.labels.items}</span><span>{items_count}</span></div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          <DeleteAndSubZoneDialog 
            dict={dict_delete} 
            locale={locale} 
            item={item} 
            zones={zones} 
            dict_zone_select={dict_zone_select} />
          <EditZones dict={dict_edit} locale={locale} zone={item} />
        </CardFooter>
      </Card>
    </>
  )
}
