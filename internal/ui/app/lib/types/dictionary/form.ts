export interface DictForms {
  messages: DictFormMessages;
  fields:   DictFormFields;
  buttons:  DictFormButtons;
}

export interface DictFormMessages {
  success: {
    post:   string;
    get:    string;
    update: string;
    delete: string;
  };
  errors: {
    general:      string,
    emtpy:        string,
    emtpy_after:  string,
    auth:         string,
    not_found:    string,
    client:       string,
    server:       string,
    unknown:      string,
  };
}

export interface DictFormFields {
  date:           DictInputField;
  name:           DictInputField;
  surname:        DictInputField;
  description:    DictInputField;

  width:          DictInputField;
  height:         DictInputField;
  weight:         DictInputField;
  length:         DictInputField;

  quantity:       DictInputField;
  identifier:     DictInputField;
  codes:          DictInputField;

  zones:          DictSelectField;
  aisles:         DictSelectField;
  racks:          DictSelectField;
  shelfs:         DictSelectField;

  suppliers:      DictSelectField;

  items:          DictSelectField;
  variants:       DictSelectField;

  tickets:        DictSelectField;
  products:       DictSelectField;
  clients:        DictSelectField;

  categories:     DictSelectField;
  subcategories:  DictSelectField;

  users:          DictSelectField;

  isBusiness:     DictCheckboxField;

  openDate:       DictInputField;
  closeDate:      DictInputField;
}

export interface DictInputField {
  label:        string;
  placeholder:  string;
  validation: {
    empty:      string;
    max:        string;
    min:        string;
    type:       string;
    valid:      string;
  };
}

export interface DictCheckboxField {
  label: string;
  isChecked: boolean;
  validation: {
    required: string;
  }
}

export interface DictSelectField {
  select: {
    label: string;
    combobox: DictSelectFieldCombobox;
  };
  validation: {
    not_found: string;
  }
}
export interface DictSelectFieldCombobox {
    select: string;
    search: string;
    empty:  string;
}


export interface DictFormButton {
  active:   string;
  pending:  string;
}

export interface DictFormButtons {
  submit: DictFormButton;
  add:    DictFormButton;
  delete: DictFormButton;
  clear:  DictFormButton;
}
