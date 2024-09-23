import { AlertCircle } from "lucide-react";

interface FormFieldErrorsPatternProps {
  errorMessages: string[],
  id: string,
}

export default function FormFieldErrorsPattern({
  errorMessages,
  id
}: FormFieldErrorsPatternProps) {
  return (
    <>
      {errorMessages.length != 0 && (
        <div 
          id={id} 
          aria-live="polite" 
          aria-atomic="true" 
          className="my-2 rounded-md p-3 gap-2 items-center flex border border-red-500 text-red-500"
        >
          <AlertCircle className="h-4 w-4" />
          <div className="text-sm">
            {errorMessages.map((error) => (
              <span key={error} className="block text-left">{error}</span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
