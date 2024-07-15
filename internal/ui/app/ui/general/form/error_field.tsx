import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  description: string[],
  id: string,
}

export default function FormError(props: FormErrorProps) {
  return (
    <>
      {props.description.length != 0 && (
        <div id={props.id} aria-live="polite" aria-atomic="true" className="my-2 rounded-md p-3 gap-2 items-center flex border border-red-500 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <div className="text-sm">
            {props.description.map((error) => (
              <span className="block text-left">{error}</span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
