import { Aisle, Rack, Zone } from "@/app/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/card"
// import { DeleteRackDialog } from "./delete/dialog";
import { DeleteAndSubRackDialog } from "./delete_safe/dialog";
import { EditRackDialog } from "./edit/dialog";
import Link from "next/link";

interface SingleAisleCardProps {
  rack: Rack;
  racks: Rack[];
  rackZone: Zone;
  rackAisle: Aisle;
  zones: Zone[];
  aisles: Aisle[];
  shelfs_count: number;
  items_count: number;

  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  dict_aisle_select: any;
  dict_rack_select: any;
}

export default function SingleRackCard({ 
  rack,
  racks,
  rackZone,
  rackAisle,
  zones,
  aisles,
  locale,
  dict_card,
  dict_edit,
  dict_delete,
  dict_zone_select,
  dict_aisle_select,
  dict_rack_select,
  shelfs_count,
  items_count }: SingleAisleCardProps) {

  return (
    <>
      <Card className="mb-4"> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">{rack.name}</span></CardTitle>
          <CardDescription>{rack.id}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex justify-between py-2 border-y">
            <span>{dict_card.labels.shelfs}</span><span>{shelfs_count}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.items}</span><span>{items_count}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.zone}</span>
            <Link href={`/zones/${rackZone.id}`}>{rackZone.name}</Link>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>{dict_card.labels.aisle}</span>
            <Link href={`/aisles/${rackAisle.id}`}>{rackAisle.name}</Link>
          </div>
        </CardContent>
        <CardFooter className="gap-2 text-sm">
          {
          // <DeleteRackDialog dict={dict_delete} id={rack.id}/>
          }
          <DeleteAndSubRackDialog
            dict={dict_delete} 
            locale={locale}
            item={rack}
            racks={racks}
            dict_rack_select={dict_rack_select} />
          <EditRackDialog 
            dict_zone_select={dict_zone_select}
            dict_aisle_select={dict_aisle_select}
            dict={dict_edit} 
            locale={locale} 
            rack={rack} 
            zones={zones}
            aisles={aisles} />
        </CardFooter>
      </Card>
    </>
  )
}
