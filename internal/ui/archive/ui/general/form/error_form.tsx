import { AlertCircle } from "lucide-react"

interface FormErrorProps {
  message: string,
}

export default function FormError(props: FormErrorProps) {
  return (
    <>
      {props.message && (
        <div aria-live="polite" aria-atomic="true" className="my-2 rounded-md p-3 gap-2 items-center flex border border-red-500 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <div className="text-sm w-full">
            <span className="block text-left">{props.message}</span>
          </div>
        </div>
      )}
    </>
  )
}
