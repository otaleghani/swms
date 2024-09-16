export interface DictionarySelectField {
  name: string;
  combobox: DictionarySelectFieldCombobox;
}

export interface DictionarySelectFieldCombobox {
    select: string;
    search: string;
    empty: string;
}

export interface DictionaryInputField {
  label: string;
  placeholder: string;
  validation: {
    empty: string;
    not_valid: string;
    max: string;
    min: string;
    type: string;
  };
}

export interface DictionaryMessages {
  success: {
    post: string;
    get: string;
    update: string;
    delete: string;
  };
  errors: {
    general: string;
  };
}

export interface DictionaryFormButton {
  active: string;
  pending: string;
}

export interface DictionaryFormButtons {
  submit: DictionaryFormButton;
  add: DictionaryFormButton;
  delete: DictionaryFormButton;
  clear: DictionaryFormButton;
}

export interface DictionaryForms {
  messages: DictionaryMessages;
  fields: {
    name: DictionaryInputField;
    description: DictionaryInputField;
    width: DictionaryInputField;
    height: DictionaryInputField;
    weight: DictionaryInputField;
    length: DictionaryInputField;
    quantity: DictionaryInputField;
    identifier: DictionaryInputField;
    variants: DictionaryInputField;
    database: DictionaryInputField;
    suppliers: DictionaryInputField;
    codes: DictionaryInputField;
  };
}
