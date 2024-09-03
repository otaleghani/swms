import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface QuantityInputProps {
  dict: any;
  className: string;
}

export default function QuantityInput({
  dict,
  className
}: QuantityInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="quantity">{dict.label}</Label>
      <Input 
        type="number"
        name="quantity"
        id="quantity"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
