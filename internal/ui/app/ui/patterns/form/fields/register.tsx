
// Components
import InputPattern from "../input/InputPattern";

// Types and interfaces
import { FormFieldsPropsWithDictCompleteMap } from "@/app/lib/types/form/fields";

export const RegisterFormFields = ({
  fields,
  result,
  errorMessages
}: FormFieldsPropsWithDictCompleteMap["Register"]) => {
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
      <InputPattern
        field="name"
        dict={fields.name.dict}
        errorMessages={errorMessages.name}
        label
        className={`${errorMessages.name.length != 0 
        ? "border-red-500" 
        : ""}`}
      />
      <InputPattern
        field="surname"
        dict={fields.surname.dict}
        errorMessages={errorMessages.surname}
        label
        className={`${errorMessages.surname.length != 0 
        ? "border-red-500" 
        : ""}`}
      />
      <input type="hidden" name="type" value="Register" />
    </>
  );
};
