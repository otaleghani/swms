"use client";

// Hooks and actions
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Types and interfaces
import { DictFormButton, DictInputField } from "@/app/lib/types/dictionary/form";
import { DictLoginErrors } from "@/app/lib/types/dictionary/pages/login";
import FormPattern from "../../patterns/form/FormPattern";
import { fieldsDefaultProps } from "@/app/lib/types/form/fields";
import { defaultLoginState } from "@/app/lib/types/data/auth";
import { authFormAction } from "@/app/lib/actions/auth/authFormAction";

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
  const error = useSearchParams().get("error") ? dictErrors.invalidToken : undefined
  const formName = "loginForm";

  useEffect(() => {
    if (error) {
      defaultLoginState.error = true;
      defaultLoginState.message = dictErrors.invalidToken;
    }
  }, []);

  return (
    <>
      <FormPattern<"Login"> 
        showButton
        type="Login"
        form={{
          formName: formName,
          initialState: defaultLoginState,
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
