import { CircleCheck } from "lucide-react"

interface FormSuccessProps {
  message: string,
}

export default function FormSuccessMessage(props: FormSuccessProps) {
  return (
    <>
      {props.message && (
        <div aria-live="polite" aria-atomic="true" className="my-2 rounded-md p-3 gap-2 items-center flex border border-green-500 text-green-500">
          <CircleCheck className="h-4 w-4" />
          <div className="text-sm w-full">
            <span className="block text-left">{props.message}</span>
          </div>
        </div>
      )}
    </>
  )
}
