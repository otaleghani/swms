import { ScrollArea } from "@/components/scroll-area"
import { Transactions } from "@/app/ui/items/single/transactions/transactions"
import { Variants } from "@/app/ui/items/single/variants/variants"
import { Actions } from "@/app/ui/items/single/actions/actions"
import { Header } from "@/app/ui/items/single/header"
import { ImageSlider } from "@/app/ui/items/single/image-slider"
import { Stats } from "@/app/ui/items/single/stats"
import { Data } from "@/app/ui/items/single/data"

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
