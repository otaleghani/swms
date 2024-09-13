import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface WeightInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: number;
}

export default function WeightInput({
  dict,
  className,
  error_messages,
  value,
}: WeightInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="weight">{dict.label}</Label>
      <Input 
        defaultValue={value}
        type="number"
        name="weight"
        id="weight"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="weight-error" 
        description={error_messages} 
      />
    </div>
  )
}
