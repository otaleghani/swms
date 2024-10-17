import { Card, CardHeader, CardTitle, CardContent } from "@/components/card"
import { Separator } from "@/components/separator"

export function Data() {
  return (
    <div className="flex gap-4 mb-4">
      <Card className="grow">
        <CardHeader>
          <CardTitle className="text-xl">Position</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Zone</span>
              <span className="text-sm font-semibold">123</span>
            </div>
            <Separator className="my-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Aisle</span>
              <span className="text-sm font-semibold">123</span>
            </div>
            <Separator className="my-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Rack</span>
              <span className="text-sm font-semibold">123</span>
            </div>
            <Separator className="my-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Shelf</span>
              <span className="text-sm font-semibold">123</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="grow">
        <CardHeader>
          <CardTitle className="text-xl">Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Length</span>
              <span className="text-sm font-semibold">123</span>
            </div>
            <Separator className="my-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Width</span>
              <span className="text-sm font-semibold">123</span>
            </div>
            <Separator className="my-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Heigth</span>
              <span className="text-sm font-semibold">123</span>
            </div>
            <Separator className="my-4" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">Weigth</span>
              <span className="text-sm font-semibold">123</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


