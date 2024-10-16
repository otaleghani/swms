import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import FormFieldError from "@/app/ui/general/form/error_field";

interface DescriptionInputProps {
  dict: any;
  className: string;
  error_messages: string[];
  value?: string;
}

export default function DescriptionInput({
  dict,
  className,
  error_messages,
  value,
}: DescriptionInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="description">{dict.label}</Label>
      <Textarea 
        defaultValue={value}
        name="description"
        id="description"
        placeholder={dict.placeholder}
      />
      <FormFieldError 
        id="description-error" 
        description={error_messages} 
      />
    </div>
  )
}
