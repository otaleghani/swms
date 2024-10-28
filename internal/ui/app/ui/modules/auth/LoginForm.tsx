"use client";

// Hooks and actions
import { useSearchParams } from "next/navigation";

// Types and interfaces
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
import { DictLoginErrors } from "@/app/lib/types/dictionary/pages/login";
import FormPattern from "../../patterns/form/FormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { authFormAction } from "@/app/lib/actions/auth/authFormAction";
import { FormState } from "@/app/lib/types/form/form";

interface LoginFormProps {
  fields: {
    email: DictInputField;
    password: DictInputField;
    button: DictFormButton;
  }
  dictErrors: DictLoginErrors;
}

export default function LoginForm({ 
  fields,
  dictErrors,
}: LoginFormProps) {
  const error = useSearchParams().get("error") ? dictErrors.invalidToken : "";
  const initialState: FormState<"Login"> = {
    error: error ? true : false, 
    errorMessages: {
      email: [],
      password: [],
    },
    message: error,
    result: {
      email: "",
      password: "",
    }
  }

  const formName = "loginForm";

  return (
    <>
      <FormPattern<"Login"> 
        showButton
        type="Login"
        form={{
          formName: formName,
          initialState: initialState,
          formAction: authFormAction<"Login">,
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
            button: fields.button
          }
        }}
      />
    </>
  );
};
