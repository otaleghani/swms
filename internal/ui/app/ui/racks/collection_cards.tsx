import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/card";
import { Button } from "@/components/button";
import Link from "next/link";
import { Aisle, Rack, Zone } from "@/app/lib/types";
import { EditRackDialog } from "./edit/dialog";

interface AislesCardsProps {
  racks: Rack[];
  aisles: Aisle[];
  zones: Zone[];

  locale: string;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  dict_aisle_select: any;
}

export default function CollectionRacksCards({ 
  racks,
  aisles, 
  zones,
  dict_card, 
  locale, 
  dict_delete, 
  dict_edit, 
  dict_zone_select, 
  dict_aisle_select
  }: AislesCardsProps) {

  return (
    <>
      <div className="grid xl:grid-cols-3 gap-4">
        {racks.map((item: any) => (
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
                dict_aisle_select={dict_zone_select} />
                {
              //<DeleteRackDialog 
              //  dict={dict_delete} 
              //  id={item.aisle.id} />
                }
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
