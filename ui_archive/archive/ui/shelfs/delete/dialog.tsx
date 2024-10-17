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
import { handlerDeleteShelf } from "./action";

interface DeleteDialog {
  dict: any;
  id: string;
}

export function DeleteShelfDialog({ dict, id }: DeleteDialog) {
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
          <AlertDialogAction onClick={() => {handlerDeleteShelf(id)}}>{dict.button}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
