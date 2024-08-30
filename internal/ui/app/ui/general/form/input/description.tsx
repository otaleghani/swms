import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";

interface DescriptionInputProps {
  dict: any;
  className: string;
}

export default function DescriptionInput({
  dict,
  className
}: DescriptionInputProps ) {
  return (
    <div className={className}>
      <Label htmlFor="description">{dict.label}</Label>
      <Textarea 
        name="description"
        id="description"
        placeholder={dict.placeholder}
      />
    </div>
  )
}
