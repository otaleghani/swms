import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/card";
import { EditAisle } from "./edit/dialog";

interface AislesCardsProps {
  aisle_data: any;
  dict_card: any;
  dict_edit: any;
  locale: string;
}

export default function AislesCards({ aisle_data, dict_card, dict_edit, locale }: AislesCardsProps) {
  console.log(aisle_data)
  return (
    <>
      <div className="grid xl:grid-cols-3 gap-4">
        {aisle_data.map((aisle: any) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{aisle.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-y"><span>{dict_card.labels.racks}</span><span>{1}</span></div>
              <div className="flex justify-between py-2 border-b"><span>{dict_card.labels.items}</span><span>{2}</span></div>
            </CardContent>
            <CardFooter className="gap-2 text-sm">
              <EditAisle 
                dict={dict_edit} 
                locale={locale} 
                aisle={aisle} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
