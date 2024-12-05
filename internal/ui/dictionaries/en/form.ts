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
      empty: "The server response was empty",
      empty_after: "The server response... What was it?",
      auth: "You are not authorized to do this action. Please login.",
      not_found: "The resource that you asked for was not found.",
      client: "The request was malformed. Refresh the page and retry.",
      server: "The server is momentarialy not available. Try again soon.",
      unknown: "Oh-oh. This should not happen. Open a github issue and ask the lead developer for help.",
      login: {
        match: "The user/password combination is incorrect. Try again."
      },
      register: {
        alreadyInUse: "The email is already used. Log in instead.",
      },
      replace: {
        equals: "You are trying to replace this entry with itself!"
      }
    }
  },
  fields: {

    password  : {
      label: "Password",
      placeholder: "Enter a strong password",
      validation: {
        empty: "The password cannot be empty.",
        max: `The password cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The password cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the password is not acceptable.",
        valid: "The password input is not valid.",
      },
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      validation: {
        empty: "The email cannot be empty.",
        max: `The email cannot exceed ${VALIDATION_SETTINGS.shortString.maxLength} characters`,
        min: `The email cannot be shorter than ${VALIDATION_SETTINGS.shortString.minLength} characters`,
        type: "The type of the email is not acceptable.",
        valid: "The email input is not valid.",
      },
    },
    search: {
      label: "Search",
      placeholder: "Enter the name",
      validation: {
        empty: "",
        max: "",
        min: "",
        type: "",
        valid: "",
      },
    },

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

    images: {
      label: "Images",
      placeholder: "Add images",
      validation: {
        empty: "The field cannot be empty",
        max: "",
        min: "",
        type: "The type of this image is not acceptable.",
        valid: "The images input is not valid.",
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
        empty: "This zone cannot be empty",
        valid: "The format of this zone was not valid, refresh the page and try again.",
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
        empty: "This aisle cannot be empty",
        valid: "The format of this aisle was not valid, refresh the page and try again.",
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
        empty: "This rack cannot be empty",
        valid: "The format of this rack was not valid, refresh the page and try again.",
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
        empty: "This shelf cannot be empty",
        valid: "The format of this shelf was not valid, refresh the page and try again.",
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
        empty: "This supplier cannot be empty",
        valid: "The format of this supplier was not valid, refresh the page and try again.",
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
        empty: "This item cannot be empty",
        valid: "The format of this item was not valid, refresh the page and try again.",
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
        empty: "This variant cannot be empty",
        valid: "The format of this variant was not valid, refresh the page and try again.",
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
        empty: "This ticket cannot be empty",
        valid: "The format of this ticket was not valid, refresh the page and try again.",
      }
    },

    ticketTypes: {
      select: {
        label: "Ticket type",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected ticket type was not found.",
        empty: "This ticket type cannot be empty",
        valid: "The format of this type was not valid, refresh the page and try again.",
      }
    },

    ticketStates: {
      select: {
        label: "Ticket state",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected ticket state was not found.",
        empty: "This state type cannot be empty",
        valid: "The format of this state was not valid, refresh the page and try again.",
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
        empty: "This product cannot be empty",
        valid: "The format of this product was not valid, refresh the page and try again.",
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
        empty: "This client cannot be empty",
        valid: "The format of this client was not valid, refresh the page and try again.",
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
        empty: "This category cannot be empty",
        valid: "The format of this category was not valid, refresh the page and try again.",
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
        empty: "This subcategory cannot be empty",
        valid: "The format of this subcategory was not valid, refresh the page and try again.",
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
        empty: "This user cannot be empty",
        valid: "The format of this user was not valid, refresh the page and try again.",
      }
    },

    weightUnit: {
      select: {
        label: "Unit",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected unit was not found.",
        empty: "This unit cannot be empty",
        valid: "The format of this unit was not valid, refresh the page and try again.",
      }
    },

    lengthUnit: {
      select: {
        label: "Unit",
        combobox: {
          select: "Select",
          search: "Search",
          empty: "Nothing found...",
        },
      },
      validation: {
        not_found: "The selected unit was not found.",
        empty: "This unit cannot be empty",
        valid: "The format of this unit was not valid, refresh the page and try again.",
      }
    },

    isBusiness: {
      label: "Business",
      isChecked: false,
      validation: {
        required: "Check this checkbox to continue",
      }
    },

    isArchived: {
      label: "Archived",
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
