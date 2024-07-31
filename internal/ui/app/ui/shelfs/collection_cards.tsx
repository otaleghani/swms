import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/card";
import { Button } from "@/components/button";
import Link from "next/link";
import { Aisle, Rack, Zone, ShelfInfo } from "@/app/lib/types";
import { EditShelfDialog } from "./edit/dialog";

interface ShelfsCardsProps {
  shelfs: ShelfInfo[];
  racks: Rack[];
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

export default function CollectionShelfsCards({ 
  shelfs,
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
  }: ShelfsCardsProps) {

  return (
    <>
      <div className="grid xl:grid-cols-3 gap-4">
        {shelfs.map((item: ShelfInfo) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{item.shelf.name}</CardTitle>
              <CardDescription className="">{item.shelf.id}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>{dict_card.labels.items}</span>
                <span>{item.items_count}</span>
              </div>
            </CardContent>

            <CardFooter className="gap-2 justify-end text-sm">
              <EditShelfDialog 
                shelf={item.shelf}
                racks={racks}
                aisles={aisles}
                zones={zones}
                locale={locale}  
                dict={dict_edit} 
                dict_zone_select={dict_zone_select}
                dict_aisle_select={dict_aisle_select}
                dict_rack_select={dict_rack_select} />
              {
              //<DeleteRackDialog 
              //  dict={dict_delete} 
              //  id={item.rack.id} />
              }
              <Button asChild variant="default">
                <Link href={`/shelf/${item.shelf.id}`}>{dict_card.labels.view}</Link>
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
