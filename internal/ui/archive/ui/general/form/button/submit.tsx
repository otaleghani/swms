import { Button } from "@/components/button"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps {
  className: string;
  form: string;
  isPending: boolean;
  dict: any;
}

export default function SubmitButton({
  className,
  form,
  isPending,
  dict
}: SubmitButtonProps ) {
  return (
    <div className={className}>
      <Button 
        disabled={isPending} 
        //className="my-2 w-full" 
        type="submit" 
        form={form}>
          {isPending ? 
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
            {dict.pending}
          </>
          : dict.active}
      </Button>
    </div>
  )
}
