/** React hooks */
import { useRef } from "react";

/** Local components */
import { Label } from "@/app/ui/components/label";
import { Input } from "@/app/ui/components/input";
import { Textarea } from "@/app/ui/components/textarea";
import InputPatternErrors from "./InputErrors";
import InputImages from "./images/InputImages";

interface InputPatternProps {
  field: 
    "name" |
    "description" |
    "identifier" |
    "code" |
    "width" |
    "height" |
    "weight" |
    "length" |
    "quantity" |
    "images";
  errorMessages: string[];
  dict: any;
  defaultValue?: string;
  className?: string;
  label?: boolean;
}

export default function InputPattern({
  field,
  className,
  errorMessages,
  defaultValue,
  label,
  dict
}: InputPatternProps) {
  const inputId = useRef(`id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const InputPatternField = () => {
    switch (field) {
      case "name":
      case "identifier":
      case "code":
        return (
          <Input
            type="text"
            defaultValue={defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={dict.placeholder}
          />
        );
      case "description":
        return (
          <Textarea
            defaultValue={defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={dict.placeholder}
          />
        );
      case "width":
      case "length":
      case "weight":
      case "length":
        return (
          <Input
            type="number"
            defaultValue={defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={dict.placeholder}
          />
        );
      case "quantity":
        return (
          <Input
            type="number"
            defaultValue={defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={dict.placeholder}
            step="1"
          />
        );
      case "images": 
        return (
          <InputImages />
        );
    };
  };

  return (
    <div className={className}>
      {label && (<Label htmlFor={`${field}-${inputId}`}>{dict.label}</Label>)}
      <InputPatternField />
      <InputPatternErrors 
        errorMessages={errorMessages}
        id={`${field}-${inputId}-errors`}
      />
    </div>
  );
}
