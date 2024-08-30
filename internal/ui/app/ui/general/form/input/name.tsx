import { Label } from "@/components/label";
import { Input } from "@/components/input";

interface NameInputProps {
  dict: any;
  className: string;
}

export default function NameInput({
  dict,
  className
}: NameInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="name">{dict.label}</Label>
      <Input 
        type="text"
        name="name"
        id="name"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
