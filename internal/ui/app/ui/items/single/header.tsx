import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/card"
import { Badge } from "@/components/badge"

export function Header() {
  return (
    <div className="pb-4">
      <Card> 
        <CardHeader className="pb-4">
          <CardTitle><span className="text-2xl font-semibold tracking-tight leading-none">Item name</span></CardTitle>
          <CardDescription>The item description for those who didn't get the memo</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Badge>Some category</Badge>
          <Badge variant="secondary">Someother category</Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
