/** Local components */
import { Button } from "@/app/ui/components/button"

/** Third-party components */
import { Loader2 } from "lucide-react"

/** Types and interfaces */
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface SubmitFormButtonPatternProps {
  className: string;
  formName: string;
  isPending: boolean;
  dict: DictFormButton;
}

export default function SubmitFormButtonPattern({
  className,
  formName,
  isPending,
  dict
}: SubmitFormButtonPatternProps ) {
  return (
    <Button 
      className={className}
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
  );
}
