import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/card"
import { Progress } from "@/components/progress"
import Image from "next/image"

export function Stats() {
  return (
    <div className="pb-4 flex gap-4">
      <Card className="flex-grow">
        <CardHeader>
          <CardDescription>In stock</CardDescription>
          <CardTitle className="text-4xl">100</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">Your base stock is set at 500</div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label="25" />
        </CardFooter>
      </Card>
      <Card>
        <div className="rounder-md p-4 h-full ">
          <Image 
            src="/assets/placeholder.svg"
            height={190}
            width={190}
            alt="some alt"
            className="rounded-md h-40 w-40 aspect-square"
          />
        </div>
      </Card>
    </div>
  )
}
