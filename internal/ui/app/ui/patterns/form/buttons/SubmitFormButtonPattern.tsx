/** Local components */
import { Button } from "@/components/button"

/** Third-party components */
import { Loader2 } from "lucide-react"

/** Types and interfaces */
import { DictionaryFormButton } from "@/app/lib/types/dictionary/form";

interface SubmitFormButtonPatternProps {
  className: string;
  formName: string;
  isPending: boolean;
  dict: DictionaryFormButton;
}

export default function SubmitFormButtonPattern({
  className,
  formName,
  isPending,
  dict
}: SubmitFormButtonPatternProps ) {
  return (
    <div className={className}>
      <Button 
        disabled={isPending} 
        type="submit" 
        form={formName}
      >
        {isPending ? 
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
          {dict.pending}
        </>
        : dict.active}
      </Button>
    </div>
  );
}
