"use client";

import { AlertCircle, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface FormErrorProps {
  description: string[] | undefined,
  id: string,
}

export default function FormError(props: FormErrorProps) {
  return (
    <>
      {props.description && (
        <div id={props.id} aria-live="polite" aria-atomic="true" className="my-2 rounded-md p-3 gap-2 items-center flex border border-red-500 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">
            {props.description.map((error) => (
              <div>{error}</div>
            ))}
          </span>
        </div>
      )}
    </>
  )
}
