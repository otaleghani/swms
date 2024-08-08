import { Aisle, Rack, Zone, Shelf } from "@/app/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
import { DeleteShelfDialog } from "./delete/dialog";
import { EditShelfDialog } from "./edit/dialog";
import Link from "next/link";

interface SingleAisleCardProps {
  shelf: Shelf;
  shelfRack: Rack;
  shelfZone: Zone;
  shelfAisle: Aisle;
  zones: Zone[];
  aisles: Aisle[];
  racks: Rack[];
  items_count: number;

  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  dict_aisle_select: any;
  dict_rack_select: any;
}

export default function SingleShelfCard({ 
  shelf,
  shelfRack,
  shelfZone,
  shelfAisle,
  zones,
  aisles,
  racks,
  locale,
  dict_card,
  dict_edit,
  dict_delete,
  dict_zone_select,
  dict_aisle_select,
  dict_rack_select,
  items_count }: SingleAisleCardProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{shelf.name}</span></CardTitle>
          <CardDescription>{shelf.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.items}</span><span>{items_count}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.zone}</span>
            <Link href={`/zones/${shelfZone.id}`}>{shelfZone.name}</Link>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.aisle}</span>
            <Link href={`/aisles/${shelfAisle.id}`}>{shelfAisle.name}</Link>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.rack}</span>
            <Link href={`/racks/${shelfRack.id}`}>{shelfRack.name}</Link>
          </div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          <DeleteShelfDialog dict={dict_delete} id={shelf.id}/>
          <EditShelfDialog 
            shelf={shelf}
            aisles={aisles}
            racks={racks}
            zones={zones}
            locale={locale}  
            dict={dict_edit} 
            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select}
            dict_rack_select={dict_rack_select} />
        </CardFooter>
      </Card>
    </>
  )
}
