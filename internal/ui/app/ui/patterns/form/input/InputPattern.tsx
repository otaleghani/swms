/** React hooks */
import { useEffect, useRef } from "react";

/** Local components */
import { Label } from "@/app/ui/components/label";
import { Input } from "@/app/ui/components/input";
import { Textarea } from "@/app/ui/components/textarea";
import FormFieldErrorsPattern from "../FormFieldErrorsPattern";
import InputPatternImages from "./images/InputPatternImages";

/** Types and interfaces */
import { DictCheckboxField, DictInputField } from "@/app/lib/types/dictionary/form";
import { InputPatternNumberWithButtons } from "./InputPatternTransaction";
import { Checkbox } from "@/app/ui/components/checkbox";
import { isInputFieldDict } from "./misc";

interface InputPatternProps {
  field: 
    "name" |
    "surname" |
    "description" |
    "identifier" |
    "code" |
    "width" |
    "height" |
    "weight" |
    "length" |
    "quantity" |
    "quantityWithButtons" |
    "images" |
    "isBusiness" |
    "email" |
    "password";
  errorMessages: string[];
  dict: DictInputField | DictCheckboxField;
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
  let inputId = "";
  useEffect(() => {
    inputId = `${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  const InputPatternField = () => {
    switch (field) {
      case "password":
        return (
          <Input
            type="password"
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            defaultValue={defaultValue}
            suppressHydrationWarning
          />
        );
      case "email":
        return (
          <Input
            type="email"
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            defaultValue={defaultValue}
            suppressHydrationWarning
          />
        );
      case "name":
      case "surname":
      case "identifier":
      case "code":
        return (
          <Input
            type="text"
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            defaultValue={defaultValue}
            suppressHydrationWarning
          />
        );
      case "description":
        return (
          <Textarea
            defaultValue={defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            suppressHydrationWarning
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
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            suppressHydrationWarning
          />
        );
      case "quantity":
        return (
          <Input
            type="number"
            defaultValue={defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            step="1"
            suppressHydrationWarning
          />
        );
      case "quantityWithButtons":
        return (
          <InputPatternNumberWithButtons 
            defaultValue={Number(defaultValue)}
            name="quantity"
            id={`${field}-${inputId}`}
          />
        );
      case "images": 
        return (
          <InputPatternImages 
            dict={dict}
          />
        );
      case "isBusiness":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={`${field}-${inputId}`} />
            <Label htmlFor={`${field}-${inputId}`}>{dict.label}</Label>
          </div>
        );
    };
  };

  return (
    <div className={className}>
      {label && field != "isBusiness" && (
        <Label htmlFor={`${field}-${inputId}`}>{dict.label}</Label>
      )}
      <InputPatternField />
      <FormFieldErrorsPattern 
        errorMessages={errorMessages}
        id={`${field}-${inputId}-errors`}
      />
    </div>
  );
}
