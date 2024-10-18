"use client"

import { useEffect, useState } from "react";
import { useToast } from "../components/hooks/use-toast";
import { ToastType } from "@/app/lib/synchronizers/utils";
import streamer from "@/app/lib/workers";
import { ToastAction } from "@radix-ui/react-toast";
import { synchronizeList } from "@/app/lib/synchronizers/lists";
import { DictFetchingToasts } from "@/app/lib/types/dictionary/toasts";

interface FetchToastPatternProps {
  /** view generic create and createInBulk for a list of valid types */
  type: string[]; 
  dict: DictFetchingToasts
}

export default function FetchToastPattern({
  type,
  dict
}: FetchToastPatternProps) {
  const { toast } = useToast()
  const [ showToast, setShowToast ] = useState("none" as ToastType);

  useEffect(() => {
    synchronizeList({
      streamer: streamer as Worker,
      setShowToast: setShowToast,
      type: type,
    });

    return () => {
      streamer?.terminate();
    };
  }, []);

  useEffect(() => {
    if (showToast == "success") {
      toast({ 
        title: dict.success.title,
        description: dict.success.description,
        action: <ToastAction 
        altText="Refresh"
          onClick={() => {
            window.location.href = window.location.href;
          }}>
          {dict.success.button}
        </ToastAction>,
      })
    }
    if (showToast == "error") {
      toast({ 
        title: dict.error.title,
        description: dict.error.description,
        variant: "destructive",
        action: <ToastAction 
        altText="Error"
          onClick={() => {
            window.location.href = window.location.href;
          }}>
          {dict.error.button}
        </ToastAction>,
      })
    }
  }, [showToast]);

  return (<></>)
}
