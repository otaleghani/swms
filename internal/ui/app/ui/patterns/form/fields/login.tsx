// Components
import InputPattern from "../input/InputPattern";

// Types and interfaces
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const LoginFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Login"]) => {
  return (
    <>
      <InputPattern
        field="email"
        dict={fields.email.dict}
        errorMessages={errorMessages.email}
        label={true}
        className={`${errorMessages.email.length != 0 
        ? "border-red-500" 
        : ""}`}
      />
      <InputPattern
        field="password"
        dict={fields.password.dict}
        errorMessages={errorMessages.password}
        label
        className={`${errorMessages.password.length != 0 
        ? "border-red-500" 
        : ""}`}
      />
      <input type="hidden" name="type" value="Login" />
    </>
  );
};
