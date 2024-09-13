import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface LengthInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: number;
}

export default function LengthInput({
  dict,
  className,
  error_messages,
  value,
}: LengthInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="length">{dict.label}</Label>
      <Input 
        defaultValue={value}
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
