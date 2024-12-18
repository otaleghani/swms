/** Local components */
import { Button } from "@/app/ui/components/button";

/** Types and interfaces */
import { DictFormButton } from "@/app/lib/types/dictionary/form";

interface ClearFormButtonPatternProps {
  className: string;
  dict: DictFormButton;
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
