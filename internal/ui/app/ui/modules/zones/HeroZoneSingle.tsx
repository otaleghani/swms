import { Warehouse } from "lucide-react";

interface Props {

}

export default function HeroZoneSingle({}: Props) {
  return (
    <header className="p-4 border-b">
      <h1 className="font-semibold text-2xl xl:text-2xl tracking-tight">
        Titolozzo
      </h1>
      <span className="font-light">uuid</span>
      <div className="grid xl:grid-cols-2 gap-2 pt-4">

        <div className="border rounded-lg shadow p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                Items
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              123
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                Items
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              123
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow p-4 ">
          <div>
            <div className="pb-2 flex justify-between">
              <div className="font-medium tracking-tight text-sm">
                Items
              </div>
              <Warehouse className="w-4 h-4" />
            </div>
            <div className="font-semibold tracking-tight text-xl">
              123
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}
