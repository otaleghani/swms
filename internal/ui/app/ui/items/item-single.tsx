import Image from "next/image"
import { Button } from "@/components/button"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"
import { Archive, Pencil, Plus, QrCode, Trash2 } from "lucide-react"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/card"
import { Progress } from "@/components/progress"
import { Badge } from "@/components/badge"
import { Separator } from "@/components/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import TransactionsPagination from "./transactions-pagination"
import { VariantPicker } from "./variant-picker"
import { AddNewTransaction } from "./add-new-transaction"

export default async function SingleItem() {
  return (
    <div className="">
      <Actions />
      <ScrollArea className="xl:h-[calc(100vh_-_57px)] h-[calc(100vh_-_114px)] p-4" type="always">
        <Header />
        <ImageSlider />
        <Stats />
        <Data />
        <Variants />
        <Transactions />
      </ScrollArea>
    </div>
  )
}

function Actions() {
  return (
    <header className="sticky gap-4 top-0 border-b p-4 h-[57px] flex justify-between items-center bg-background z-10">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Archive className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <QrCode className="h-4 w-4" />
        </Button>
      </div>
      <AddNewTransaction />
      
      {
      // <Button variant="outline" size="sm">
      //   <Plus className="h-4 w-4 mr-2" /> New Variant
      // </Button>
      }
    </header>
  )
}

function Header() {
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

function ImageSlider() {
  return (
    <ScrollArea className="whitespace-nowrap rounded-lg border mb-4">
      <div className="flex p-4">
        <Image 
          src="/assets/placeholder.svg"
          height={200}
          width={200}
          alt="some alt"
          className="h-72 w-auto pr-4 rounded-md block"
        />
        <Image 
          src="/assets/placeholder.svg"
          height={200}
          width={200}
          alt="some alt"
          className="h-72 w-auto pr-4 rounded-md block"
        />
        <Image 
          src="/assets/placeholder.svg"
          height={200}
          width={200}
          alt="some alt"
          className="h-72 w-auto pr-4 rounded-md block"
        />
        <Image 
          src="/assets/placeholder.svg"
          height={200}
          width={200}
          alt="some alt"
          className="h-72 w-auto pr-4 rounded-md block"
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function Stats() {
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

const data = [ "Zone", "Aisle", "Rack", "Shelf" ]

function Data() {
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

function Transactions() {
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

function Variants() {
  return (
    <Card className="mb-4">
      <CardHeader className="">
        <CardTitle>Variants</CardTitle>
        <VariantPicker />
      </CardHeader>
      <CardContent>
        <div>
           
        </div>
      </CardContent>
    </Card>
  )
}
