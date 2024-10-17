import { Label } from "@/components/label";
import { Input } from "@/components/input";
import FormFieldError from "@/app/ui/general/form/error_field";

interface NameInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: string;
}

export default function NameInput({
  dict,
  className,
  error_messages,
  value,
}: NameInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="name">{dict.label}</Label>
      <Input 
        defaultValue={value}
        className={`${error_messages.length != 0 
        ? "border-red-500" 
        : ""}`}
        type="text"
        name="name"
        id="name"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="name-error" 
        description={error_messages} 
      />
    </div>
  )
}
