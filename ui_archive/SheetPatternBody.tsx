import { Zone, Zones } from "@/app/lib/types/data/zones";
import { DictSelectField } from "@/app/lib/types/dictionary/form";
// SheetPatternBody.tsx
import React, { useState, ChangeEvent, memo } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import { ListFilter } from "lucide-react";
import { Input } from "@/app/ui/components/input";
import { SheetHeader, SheetTitle } from "@/app/ui/components/sheet";
import ForeignKeyFilter from "../ForeignKeyFilter";

interface SheetPatternBodyProps {
  zones: {
    list: Zones;
    dict: DictSelectField;
  };
  zone: Zone;
  setZone: React.Dispatch<React.SetStateAction<Zone>>;
  link: string;
}

const SheetPatternBody: React.FC<SheetPatternBodyProps> = ({
  zones,
  zone,
  setZone,
  link,
}) => {
  const [search, setSearch] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <SheetHeader className="mb-4">
        <SheetTitle className="font-semibold text-xl">Filter</SheetTitle>
      </SheetHeader>

      <div className="mb-4">
        <ForeignKeyFilter<"Zone">
          name="Zone"
          list={zones.list}
          dict={zones.dict}
          element={zone}
          setElement={setZone}
        />

        <Input
          type="text"
          placeholder="Your search.."
          onChange={handleInput}
          value={search}
        />
      </div>

      <div className="flex gap-2">
        <Button asChild>
          <Link href={link}>Filtra</Link>
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setZone({ id: "", name: "" });
            setSearch("");
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default memo(SheetPatternBody);
