export interface DictLoginErrors {
  invalidToken: string;
}
export interface DictLoginPage {
  title: string;
  description: string;
  footer: DictLoginFooter;
  error: DictLoginErrors;
}

/** Something like: You don't have an account? Register here. */
export interface DictLoginFooter {
  registerQuestion: string;
  registerLink: string;
}
