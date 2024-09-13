import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface HeightInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: number;
}

export default function HeightInput({
  dict,
  className,
  error_messages,
  value,
}: HeightInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="height">{dict.label}</Label>
      <Input 
        defaultValue={value}
        type="number"
        name="height"
        id="height"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="height-error" 
        description={error_messages} 
      />
    </div>
  )
}
