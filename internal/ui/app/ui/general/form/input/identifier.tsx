import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface IdentifierInputProps {
  dict: any;
  className: string;
}

export default function IdentifierInput({
  dict,
  className
}: IdentifierInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="identifier">{dict.label}</Label>
      <Input 
        type="text"
        name="identifier"
        id="identifier"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
