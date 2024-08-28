import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";

import { Category } from "@/app/lib/types";

//import { EditZones } from "./edit/dialog";
//import { DeleteAndSubZoneDialog } from "./delete_safe/dialog";

interface CategoryCardProps {
  categories: Category[];
  locale: string;
  dict_card: any;
  //dict_edit: any;
  //dict_delete: any;
  //dict_zone_select: any;
}

export default function CollectionCategoryCards({ 
  categories,
  locale, 
  dict_card, 
  //dict_edit, 
  //dict_delete, 
  //dict_zone_select
}: CategoryCardProps) {

  return (
    <>
      {categories.map((item: Category) => (
        <Card>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.id}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <span>{item.description}</span>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 text-sm">
            {
            // <DeleteAndSubZoneDialog 
            //   dict={dict_delete} 
            //   locale={locale} 
            //   item={zone.zone} 
            //   zones={zones_collection} 
            //   dict_zone_select={dict_zone_select} />
            // <EditZones 
            //   dict={dict_edit} 
            //   locale={locale} 
            //   zone={zone.zone} />
            }
            <Button asChild variant="default">
              <Link href={`/categories/${item.id}`}>
                {dict_card.labels.view}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
