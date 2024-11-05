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
    empty:        string,
    empty_after:  string,
    auth:         string,
    not_found:    string,
    client:       string,
    server:       string,
    unknown:      string,
    login: {
      match:      string,
    };
    register: {
      alreadyInUse:      string,
    };
    replace: {
      equals: string,
    }
  };
};

export interface DictFormFields {
  email:          DictInputField;
  password:       DictInputField;
  search:         DictInputField;

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
  ticketTypes:    DictSelectField;
  ticketStates:   DictSelectField;
  products:       DictSelectField;
  clients:        DictSelectField;

  categories:     DictSelectField;
  subcategories:  DictSelectField;

  users:          DictSelectField;

  isBusiness:     DictCheckboxField;

  openDate:       DictDatePickerField;
  closeDate:      DictDatePickerField;
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

export interface DictDatePickerField {
  label:        string;
  placeholder:  string; // Pick a date!
  validation: {
    empty:      string;
    type:       string;
    valid:      string;
  }
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
