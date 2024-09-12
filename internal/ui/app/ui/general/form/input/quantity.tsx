import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface QuantityInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: number;
}

export default function QuantityInput({
  dict,
  className,
  error_messages,
  value,
}: QuantityInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="quantity">{dict.label}</Label>
      <Input 
        defaultValue={value}
        type="number"
        step={1}
        name="quantity"
        id="quantity"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="quantity-error" 
        description={error_messages} 
      />
    </div>
  )
}
