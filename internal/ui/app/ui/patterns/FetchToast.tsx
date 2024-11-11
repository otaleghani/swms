"use client"

import { useEffect, useState } from "react";
import { useToast } from "../components/hooks/use-toast";
import { ToastType } from "@/app/lib/synchronizers/utils";
import streamer from "@/app/lib/workers";
import { ToastAction } from "@radix-ui/react-toast";
import { synchronizeBreakingChange } from "@/app/lib/synchronizers/breakingChange";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";
import { SelectableItem } from "@/app/lib/types/form/fields";

interface FetchToastPatternProps {
  /** view generic create and createInBulk for a list of valid types */
  type: SelectableItem;
  dict: DictFetchingToasts;
  id: string;
}

export default function FetchToastPattern({
  type,
  dict,
  id,
}: FetchToastPatternProps) {
  const { toast } = useToast()
  const [ showToast, setShowToast ] = useState("none" as ToastType);

  useEffect(() => {
    synchronizeBreakingChange({
      streamer: streamer as Worker,
      setShowToast: setShowToast,
      type: type,
      id: id,
    });
  }, []);

  useEffect(() => {
    if (showToast == "empty") {
      toast({ 
        title: dict.empty.title,
        description: dict.empty.description,
        variant: "destructive",
        action: <ToastAction 
        altText="Error"
          onClick={() => {
            window.location.href = "/";
          }}>
          {dict.empty.button}
        </ToastAction>,
      })
    }
  }, [showToast]);

  return (<></>)
}
