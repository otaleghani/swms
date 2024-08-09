import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/card";
import { Button } from "@/components/button";
import Link from "next/link";
import { Aisle, Rack, RackInfo, Zone } from "@/app/lib/types";
import { EditRackDialog } from "./edit/dialog";
import { DeleteAndSubRackDialog } from "./delete_safe/dialog";

interface RacksCardsProps {
  racks: RackInfo[];
  aisles: Aisle[];
  zones: Zone[];

  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  dict_aisle_select: any;
  dict_rack_select: any;
}

export default function CollectionRacksCards({ 
  racks,
  aisles, 
  zones,
  locale, 
  dict_card, 
  dict_delete, 
  dict_edit, 
  dict_zone_select, 
  dict_aisle_select,
  dict_rack_select
  }: RacksCardsProps) {

  let racksList: Rack[] = [];
  for (let i = 0; i < racks.length; i++) {
    racksList.push(racks[i].rack)
  }

  return (
    <>
      <div className="grid xl:grid-cols-3 gap-4">
        {racks.map((item: RackInfo) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{item.rack.name}</CardTitle>
              <CardDescription className="">{item.rack.id}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-y">
                <span>{dict_card.labels.shelfs}</span>
                <span>{item.shelfs_count}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>{dict_card.labels.items}</span>
                <span>{item.items_count}</span>
              </div>
            </CardContent>

            <CardFooter className="gap-2 justify-end text-sm">
              <EditRackDialog 
                rack={item.rack} 
                zones={zones}
                aisles={aisles}
                locale={locale} 
                dict={dict_edit} 
                dict_zone_select={dict_zone_select}
                dict_aisle_select={dict_aisle_select} />
              <DeleteAndSubRackDialog
                dict={dict_delete} 
                locale={locale}
                item={item.rack}
                racks={racksList}
                dict_rack_select={dict_rack_select} />
              <Button asChild variant="default">
                <Link href={`/racks/${item.rack.id}`}>{dict_card.labels.view}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {racks.length === 0 ? 
          <div className="text-center xl:col-span-3 py-12">Nothing to see here</div> 
          : <></> }
      </div>
    </>
  )
}
