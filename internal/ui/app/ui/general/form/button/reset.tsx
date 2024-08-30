import { Button } from "@/components/button";

interface ReseltButtonProps {
  className: string;
  dict: any;
}

export default function ResetButton({
  className,
  dict
}: ReseltButtonProps ) {
  return (
    <div className={className}>
      <Button variant="secondary" className="w-full" type="reset">
        {dict.clear_button}
      </Button>
    </div>
  )
}
