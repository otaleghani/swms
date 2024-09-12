import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface WidthInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: number;
}

export default function WidthInput({
  dict,
  className,
  error_messages,
  value,
}: WidthInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="width">{dict.label}</Label>
      <Input 
        defaultValue={value}
        type="number"
        name="width"
        id="width"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="width-error" 
        description={error_messages} 
      />
    </div>
  )
}
