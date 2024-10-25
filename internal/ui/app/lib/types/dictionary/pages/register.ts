export interface DictRegisterPage {
  title: string;
  description: string;
  footer: DictRegisterFooter;
}

/** Something like: You don't have an account? Register here. */
export interface DictRegisterFooter {
  loginQuestion: string;
  loginLink: string;
}
