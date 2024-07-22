import { AddBulkZones } from "@/app/ui/zones/bulk_add/form";
import { Button } from "@/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import Link from "next/link";
import { getDictionary, Locale } from "@/lib/dictionaries";
import getZones from "@/app/lib/requests/zones/get";

interface ZonesPageProps {
  params: {
    lang: string;
  }
}

export default async function ZonePage({ params }: ZonesPageProps ) {
  const dict = await getDictionary(params.lang as Locale);
  const promiseData = getZones()
  const [data] = await Promise.all([promiseData])

  return (
    <div>
      <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
        <h1 className="font-semibold text-xl leading-none tracking-tight">{dict.zones.title}</h1>
        <AddBulkZones dict={dict.zones.bulk_form} locale={params.lang} />
      </header>
      <main className="p-4 grid xl:grid-cols-6">
        {data.map((zone: any) => (
          <Card>
            <CardHeader>
              <CardTitle>{zone.name}</CardTitle>
              <CardDescription>Zone unique id is like a number</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-y"><span>Aisles</span><span>9</span></div>
              <div className="flex justify-between py-2 border-b"><span>Items</span><span>123</span></div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 text-sm">
              <Button variant="secondary">Edit</Button>
              <Button asChild variant="default">
                <Link href="/zone/id">View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  )
}
