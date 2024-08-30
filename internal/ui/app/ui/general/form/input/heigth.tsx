import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface HeightInputProps {
  dict: any;
  className: string;
}

export default function HeightInput({
  dict,
  className
}: HeightInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="height">{dict.label}</Label>
      <Input 
        type="number"
        name="height"
        id="height"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
