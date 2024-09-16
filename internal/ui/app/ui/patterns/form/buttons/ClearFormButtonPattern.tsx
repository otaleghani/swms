/** Local components */
import { Button } from "@/components/button";

/** Types and interfaces */
import { DictionaryFormButton } from "@/app/lib/types/dictionary/form";

interface ClearFormButtonPatternProps {
  className: string;
  dict: DictionaryFormButton;
}

export default function ClearFormButtonPattern({
  className,
  dict
}: ClearFormButtonPatternProps ) {
  return (
    <div className={className}>
      <Button variant="secondary" className="w-full" type="reset">
        {dict.active}
      </Button>
    </div>
  )
}
