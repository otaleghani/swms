"use client";

// Types and interfaces
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
import FormPattern from "../../patterns/form/FormPattern";
import { defaultRegisterState } from "@/app/lib/types/data/auth";
import { authFormAction } from "@/app/lib/actions/auth/authFormAction";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";

interface RegisterFormProps {
  fields: {
    email: DictInputField;
    password: DictInputField;
    name: DictInputField;
    surname: DictInputField;
    button: DictFormButton;
  };
}

export default function RegisterForm({ 
  fields,
}: RegisterFormProps) {
  const formName = "registerForm";

  return (
    <>
      <FormPattern<"Register"> 
        showButton
        type="Register"
        form={{
          formName: formName,
          initialState: defaultRegisterState,
          formAction: authFormAction<"Register">,
        }}
        self={{
          fields: {
            ...fieldsDefaultProps,
            email: {
              dict: fields.email,
            },
            password: {
              dict: fields.password,
            },
            name: {
              dict: fields.name,
            },
            surname: {
              dict: fields.surname
            },
            button: fields.button
          }
        }}

      />
    </>
  );
};
