import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface WeightInputProps {
  dict: any;
  className: string;
  error_messages: string[];
}

export default function WeightInput({
  dict,
  className,
  error_messages
}: WeightInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="weight">{dict.label}</Label>
      <Input 
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
