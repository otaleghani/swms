"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog"
import { Button } from "@/components/button"
import { Trash2 } from "lucide-react";
import { DeleteZone } from "@/app/lib/requests/zones/delete";
import { revalidateTag } from "next/cache";
import { HandlerDeleteZone } from "./action";

interface DeleteDialog {
  dict: any;
  id: string;
}

// useEffect to understand the state

export function DeleteZoneDialog({ dict, id }: DeleteDialog) {
  // const handleDeleteZone = (async (id: string) => {
  //   const resPromise = DeleteZone(id);
  //   const [res_body] = await Promise.all([resPromise]);
  //   console.log(res_body)
  //   
  //   revalidateTag("zone");
  // })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="aspect-square p-0"><Trash2 className="w-[1.2rem] h-[1.2rem]" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dict.title}</AlertDialogTitle>
          <AlertDialogDescription>{dict.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{dict.clear_button}</AlertDialogCancel>
          <AlertDialogAction onClick={() => {HandlerDeleteZone(id)}}>{dict.button}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
