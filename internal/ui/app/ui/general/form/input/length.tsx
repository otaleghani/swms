import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface LengthInputProps {
  dict: any;
  className: string;
}

export default function LengthInput({
  dict,
  className
}: LengthInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="length">{dict.label}</Label>
      <Input 
        type="number"
        name="length"
        id="length"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
