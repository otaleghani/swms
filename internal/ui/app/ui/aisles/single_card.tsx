import { Aisle, Zone } from "@/app/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { DeleteAisleDialog } from "./delete/dialog";
import { EditAisle } from "./edit/dialog";

interface SingleAisleCardProps {
  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  zones: Zone[];
  aisle: Aisle;
  racks_count: number;
  items_count: number;
}

export default function SingleAisleCard({ 
  locale,
  zones,
  aisle,
  dict_card,
  dict_edit,
  dict_delete,
  dict_zone_select,
  racks_count,
  items_count }: SingleAisleCardProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{aisle.name}</span></CardTitle>
          <CardDescription>{aisle.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-y"><span>{dict_card.labels.aisles}</span><span>{racks_count}</span></div>
          <div className="flex justify-between py-2 border-b"><span>{dict_card.labels.items}</span><span>{items_count}</span></div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          <DeleteAisleDialog dict={dict_delete} id={aisle.id}/>
          <EditAisle 
            dict_zone_select={dict_zone_select}
            dict={dict_edit} 
            locale={locale} 
            aisle={aisle} 
            zones={zones} />
        </CardFooter>
      </Card>
    </>
  )
}
