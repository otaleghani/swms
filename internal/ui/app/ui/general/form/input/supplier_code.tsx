import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface SupplierCodeInputProps {
  dict: any;
  className: string;
  error_messages: string[];
}

export default function SupplierCodeInput({
  dict,
  className,
  error_messages
}: SupplierCodeInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="supplier_code">{dict.label}</Label>
      <Input 
        className={`${error_messages.length != 0 
        ? "border-red-500" 
        : ""}`}
        type="text"
        name="supplier_code"
        id="supplier_code"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="name-error" 
        description={error_messages} 
      />
    </div>
  )
}
