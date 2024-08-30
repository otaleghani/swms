import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface WeightInputProps {
  dict: any;
  className: string;
}

export default function WeightInput({
  dict,
  className
}: WeightInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="weight">{dict.label}</Label>
      <Input 
        type="number"
        name="weight"
        id="weight"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
