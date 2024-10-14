import { DictForms } from "@/app/lib/types/dictionary/form";
import { VALIDATION_SETTINGS } from "@/app/lib/validation/validation.config";

export const dictionaryForm: DictForms = {
  messages: {
    success: {
      post: "Succefully added",
      get: "Succefully retrieved",
      update: "Succefully updated",
      delete: "Succefully delete",
    },
    errors: {
      general: "General server error",
      emtpy: "The server response was empty",
      emtpy_after: "The server response... What was it?",
      auth: "You are not authorized to do this action. Please login.",
      not_found: "The resource that you asked for was not found.",
      client: "The request was malformed. Refresh the page and retry.",
      server: "The server is momentarialy not available. Try again soon.",
      unknown: "Oh-oh. This should not happen. Open a github issue and ask the lead developer for help.",
    }
  },
  fields: {
    date: {
      label: "Date",
      placeholder: "Enter the date",
      validation: {
        empty: "The date cannot be empty.",
        max: "This error should not be here. Contact the admin.",
        min: "This error should not be here. Contact the admin.",
        type: "The type of the input is not acceptable.",
        valid: "The date input is not valid.",
      },
    },

    name: {
      label: "Name",
      placeholder: "Enter the name",
      validation: {
        empty: "The name cannot be empty.",
        max: `The name cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The name cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the name is not acceptable.",
        valid: "The name input is not valid.",
      },
    },

    surname: {
      label: "Surname",
      placeholder: "Enter the surname",
      validation: {
        empty: "The surname cannot be empty.",
        max: `The surname cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The surname cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the surname is not acceptable.",
        valid: "The surname input is not valid.",
      },
    },

    description: {
      label: "Description",
      placeholder: "Enter the description",
      validation: {
        empty: "The description cannot be empty.",
        max: `The description cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The description cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the description is not acceptable.",
        valid: "The description input is not valid.",
      },
    },

    width: {
      label: "Width",
      placeholder: "Enter the width",
      validation: {
        empty: "The width cannot be empty.",
        max: `The width cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The width cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the width is not acceptable.",
        valid: "The width input is not valid.",
      },
    },

    height: {
      label: "Height",
      placeholder: "Enter the height",
      validation: {
        empty: "The height cannot be empty.",
        max: `The height cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The height cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the height is not acceptable.",
        valid: "The height input is not valid.",
      },
    },

    weight: {
      label: "Weight",
      placeholder: "Enter the weight",
      validation: {
        empty: "The weight cannot be empty.",
        max: `The weight cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The weight cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the weight is not acceptable.",
        valid: "The weight input is not valid.",
      },
    },

    length: {
      label: "Length",
      placeholder: "Enter the length",
      validation: {
        empty: "The length cannot be empty.",
        max: `The length cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The length cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the length is not acceptable.",
        valid: "The length input is not valid.",
      },
    },

    quantity: {
      label: "Quantity",
      placeholder: "Enter the quantity",
      validation: {
        empty: "The quantity cannot be empty.",
        max: `The quantity cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The quantity cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the quantity is not acceptable.",
        valid: "The quantity input is not valid.",
      },
    },

    identifier: {
      label: "Identifier",
      placeholder: "Enter the identifier",
      validation: {
        empty: "The identifier cannot be empty.",
        max: `The identifier cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The identifier cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the identifier is not acceptable.",
        valid: "The identifier input is not valid.",
      },
    },

    codes: {
      label: "Code",
      placeholder: "Enter the code",
      validation: {
        empty: "The code cannot be empty.",
        max: `The code cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The code cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the code is not acceptable.",
        valid: "The code input is not valid.",
      },
    },

    zones: {
      select: {
        label: "Zone",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected zone was not found.",
      }
    },

    aisles: {
      select: {
        label: "Aisle",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected aisle was not found.",
      }
    },

    racks: {
      select: {
        label: "Rack",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected rack was not found.",
      }
    },

    shelfs: {
      select: {
        label: "Shelf",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected shelf was not found.",
      }
    },

    suppliers: {
      select: {
        label: "Supplier",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected supplier was not found.",
      }
    },

    items: {
      select: {
        label: "Item",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected item was not found.",
      }
    },

    variants: {
      select: {
        label: "Variant",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected variant was not found.",
      }
    },

    tickets: {
      select: {
        label: "Ticket",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected ticket was not found.",
      }
    },

    products: {
      select: {
        label: "Product",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected product was not found.",
      }
    },

    clients: {
      select: {
        label: "Client",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected client was not found.",
      }
    },

    categories: {
      select: {
        label: "Category",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected category was not found.",
      }
    },

    subcategories: {
      select: {
        label: "Subcategory",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected subcategory was not found.",
      }
    },

    users: {
      select: {
        label: "User",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected user was not found.",
      }
    },

    isBusiness: {
      label: "Business",
      isChecked: false,
      validation: {
        required: "Check this checkbox to continue",
      }
    },

    openDate: {
      label: "Open date",
      placeholder: "Pick a date...",
      validation: {
        empty: "The open date cannot be empty.",
        type: "The type of this field is not acceptable.",
        valid: "The data is not valid. Try again.",
      }
    },

    closeDate: {
      label: "Close date",
      placeholder: "Pick a date...",
      validation: {
        empty: "The close date cannot be empty.",
        type: "The type of this field is not acceptable.",
        valid: "The data is not valid. Try again.",
      }
    }
  },

  buttons: {
    submit: {
      active: "Send",
      pending: "Wait a second...",
    },
    add: {
      active: "Add",
      pending: "Wait a second...",
    },
    delete: {
      active: "Delete",
      pending: "Wait a second...",
    },
    clear: {
      active: "Clear",
      pending: "Wait a second...",
    },
  }
}
