import { Card, CardHeader, CardTitle, CardContent } from "@/components/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { Separator } from "@/components/separator"
import TransactionsPagination from "@/app/ui/items/single/transactions/pagination"

export function Transactions() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between text-sm items-center">
              <div className="flex gap-4">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarImage src="/assets/placeholder.svg" alt="alt text" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ">
                  <span className="text-sm font-semibold">Oliviero Taleghani</span>
                  <span className="text-sm">o.taleghani@talesign.com</span>
                </div>
              </div>
              <div>2024-07-09 18:04</div>
              <div className="font-semibold">-1</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <div className="flex justify-between text-sm items-center">
              <div className="flex gap-4">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarImage src="/assets/placeholder.svg" alt="alt text" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ">
                  <span className="text-sm font-semibold">Oliviero Taleghani</span>
                  <span className="text-sm">o.taleghani@talesign.com</span>
                </div>
              </div>
              <div>2024-07-09 18:04</div>
              <div className="font-semibold">-1</div>
            </div>
          </div>

          <Separator className="my-4" />
          <TransactionsPagination totalPages={40}/>
        </CardContent>
      </Card>
    </div>
  )
}
