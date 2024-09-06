import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface LengthInputProps {
  dict: any;
  className: string;
  error_messages: string[];
}

export default function LengthInput({
  dict,
  className,
  error_messages
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
      <FormFieldError 
        id="length-error" 
        description={error_messages} 
      />
    </div>
  )
}
