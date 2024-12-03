/** React hooks */
import { useEffect, useRef, useState } from "react";

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
  setResult?: any;
}

export default function InputPattern({
  field,
  className,
  errorMessages,
  defaultValue,
  label,
  dict,
  setResult
}: InputPatternProps) {
  let inputId = "";
  useEffect(() => {
    inputId = `${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  const [data, setData] = useState(defaultValue ? defaultValue : "");

  /** 
  * Handles the input change. 
  *
  * Before we were handling the input change by using defaultValue and without using a useState.
  * This created a wierd problem where whenever a server action would trigger (e.g. a dialog form submission)
  * the input would be resetted. Now we handle the data inside of the input with a useState that starts
  * with the defaultValue or gets created as an empty string. You can then pass a new function called 
  * "setResult" that sets a new useState in the parent, holding the state of the form even during a rerender.
  *
  * Actually the re-render was just triggered because I had a function component in a const...
  * */
  const handleChange = (e: any) => {
    setData(e.target.value)
    const { name, value } = e.target;
    if (setResult) {
      setResult((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  /** 
  * This kind of pattern triggers a new render everytime something happenes, even on every keystroke.
  * */
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
            //defaultValue={defaultValue}
            suppressHydrationWarning
            onChange={handleChange}
            value={data}
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
            //defaultValue={defaultValue}
            suppressHydrationWarning
            onChange={handleChange}
            value={data}
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
            onChange={handleChange}
          />
        );

      case "width":
      case "length":
      case "height":
      case "weight":
        return (
          <Input
            type="number"
            defaultValue={defaultValue === "0" ? "" : defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            suppressHydrationWarning
            onChange={handleChange}
          />
        );
      case "quantity":
        return (
          <Input
            type="number"
            defaultValue={defaultValue === "0" ? "" : defaultValue}
            name={field}
            id={`${field}-${inputId}`}
            placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
            step="1"
            suppressHydrationWarning
            onChange={handleChange}
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

      {field == "password" && (
        <Input
          type="password"
          name={field}
          id={`${field}-${inputId}`}
          placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
          defaultValue={defaultValue}
          suppressHydrationWarning
        />
      )}

      {field == "email" && (
        <Input
          type="email"
          name={field}
          id={`${field}-${inputId}`}
          placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
          suppressHydrationWarning
          onChange={handleChange}
          value={data}
        />
      )}

      {(field == "name" || field == "surname" || field == "identifier" || field == "code") && (
        <Input
          type="text"
          name={field}
          id={`${field}-${inputId}`}
          placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
          suppressHydrationWarning
          onChange={handleChange}
          value={data}
        />
      )}

      {field == "description" && (
        <Textarea
          defaultValue={defaultValue}
          name={field}
          id={`${field}-${inputId}`}
          placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
          suppressHydrationWarning
          onChange={handleChange}
        />
      )}

      {(field == "width" || field == "length" || field == "height" || field == "weight") && (
        <Input
          type="number"
          defaultValue={defaultValue === "0" ? "" : defaultValue}
          name={field}
          id={`${field}-${inputId}`}
          placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
          suppressHydrationWarning
          onChange={handleChange}
        />
      )}
      
      {field == "quantity" && (
        <Input
          type="number"
          defaultValue={defaultValue === "0" ? "" : defaultValue}
          name={field}
          id={`${field}-${inputId}`}
          placeholder={isInputFieldDict(dict) ? dict.placeholder : ""}
          step="1"
          suppressHydrationWarning
          onChange={handleChange}
        />
      )}

      {field == "quantityWithButtons" && (
        <InputPatternNumberWithButtons 
          defaultValue={Number(defaultValue)}
          name="quantity"
          id={`${field}-${inputId}`}
        />
      )}

      {field == "images" && ( <InputPatternImages dict={dict} /> )}

      {field == "isBusiness" && (
        <div className="flex items-center space-x-2">
          <Checkbox id={`${field}-${inputId}`} />
          <Label htmlFor={`${field}-${inputId}`}>{dict.label}</Label>
        </div>
      )}

      <FormFieldErrorsPattern 
        errorMessages={errorMessages}
        id={`${field}-${inputId}-errors`}
      />
    </div>
  );
}
