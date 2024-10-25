import { DictPages } from "@/app/lib/types/dictionary/pages";
import { DictLoginPage } from "@/app/lib/types/dictionary/pages/login";
import { DictRegisterPage } from "@/app/lib/types/dictionary/pages/register";

const dictionaryLoginPage: DictLoginPage = {
  title: "Login",
  description: "Enter the app with your credentials.",
  footer: {
    registerQuestion: "You don't have an account?",
    registerLink: "Register here.",
  },
  error: {
    invalidToken: "Your session expired. Login again.",
  }
}

const dictionaryRegisterPage: DictRegisterPage = {
  title: "Register",
  description: "Create a new account with a strong password",
  footer: {
    loginQuestion: "Already have an account?",
    loginLink: "Login here.",
  },
}

export const dictionaryPages: DictPages = {
  login: dictionaryLoginPage,
  register: dictionaryRegisterPage,
}
