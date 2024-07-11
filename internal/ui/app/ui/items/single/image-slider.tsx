import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"

export function ImageSlider() {
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
