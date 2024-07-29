import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/card";
import { EditAisle } from "./edit/dialog";
import { DeleteAisle } from "@/app/lib/requests/aisles/delete";
import { DeleteAisleDialog } from "./delete/dialog";
import { Button } from "@/components/button";
import Link from "next/link";

interface AislesCardsProps {
  aisle_data: any;
  dict_card: any;
  dict_edit: any;
  dict_delete: any;
  dict_zone_select: any;
  locale: string;
  zones: any[];
}

export default function CollectionAislesCards({ aisle_data, dict_card, dict_delete, dict_edit, dict_zone_select, locale, zones }: AislesCardsProps) {
  console.log(aisle_data)
  return (
    <>
      <div className="grid xl:grid-cols-3 gap-4">
        {aisle_data.map((item: any) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{item.aisle.name}</CardTitle>
              <CardDescription className="">{item.aisle.id}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-y"><span>{dict_card.labels.racks}</span><span>{item.racks_count}</span></div>
              <div className="flex justify-between py-2 border-b"><span>{dict_card.labels.items}</span><span>{item.items_count}</span></div>
            </CardContent>
            <CardFooter className="gap-2 justify-end text-sm">
              <EditAisle 
                dict_zone_select={dict_zone_select}
                dict={dict_edit} 
                locale={locale} 
                aisle={item.aisle} 
                zones={zones} />
              <DeleteAisleDialog dict={dict_delete} id={item.aisle.id} />
              <Button asChild variant="default">
                <Link href={`/aisles/${item.aisle.id}`}>{dict_card.labels.view}</Link>
              </Button>

            </CardFooter>
          </Card>
        ))}
        {aisle_data.length === 0 ? <div className="text-center xl:col-span-3 py-12">Nothing to see here </div> : <></>}
      </div>
    </>
  )
}
