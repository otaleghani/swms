import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface WidthInputProps {
  dict: any;
  className: string;
}

export default function WidthInput({
  dict,
  className
}: WidthInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="width">{dict.label}</Label>
      <Input 
        type="number"
        name="width"
        id="width"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
