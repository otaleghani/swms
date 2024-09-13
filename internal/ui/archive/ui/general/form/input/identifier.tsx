import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface IdentifierInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: string;
}

export default function IdentifierInput({
  dict,
  className,
  error_messages,
  value,
}: IdentifierInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="identifier">{dict.label}</Label>
      <Input 
        defaultValue={value}
        type="text"
        name="identifier"
        id="identifier"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="identifier-error" 
        description={error_messages} 
      />
    </div>
  )
}
