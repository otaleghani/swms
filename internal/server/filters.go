package server

import (
	"errors"
	"reflect"
	"strings"
	"time"

	"github.com/otaleghani/swms/internal/database"
)

// Filters a slice of structs based on a specified field and value.
// If the field does not exist in the struct, it returns the original
func FilterByField[T any](
  items []T, 
  fieldName string, 
  value interface{},
) ([]T, error) {
	var filteredItems []T

	// Get the type of T
	var tType reflect.Type
	if len(items) > 0 {
		tType = reflect.TypeOf(items[0])
	} else {
		return nil, errors.New("items slice is empty")
	}

	// Ensure T is a struct
	if tType.Kind() != reflect.Struct {
		return nil, errors.New("type T must be a struct")
	}

	// Check if the field exists
	field, found := tType.FieldByName(fieldName)
	if !found {
		// Field does not exist; return the original slice
		return items, nil
	}

	// Iterate over the items and filter based on the field value
	for _, item := range items {
		itemValue := reflect.ValueOf(item)

		// Get the field value
		fValue := itemValue.FieldByName(field.Name)

		// Handle pointer to struct
		if fValue.Kind() == reflect.Ptr {
			if fValue.IsNil() {
				continue
			}
			fValue = fValue.Elem()
		}

		// Compare the field value with the desired value
		if reflect.DeepEqual(fValue.Interface(), value) {
			filteredItems = append(filteredItems, item)
		}
	}

	return filteredItems, nil
}

func FilterBySearch[T any](
  items []T, 
  fieldName string, 
  value string,
) ([]T, error) {
	var filteredItems []T

	// Get the type of T
	var tType reflect.Type
	if len(items) > 0 {
		tType = reflect.TypeOf(items[0])
	} else {
		return nil, errors.New("items slice is empty")
	}

	// Ensure T is a struct
	if tType.Kind() != reflect.Struct {
		return nil, errors.New("type T must be a struct")
	}

	// Check if the field exists
	field, found := tType.FieldByName(fieldName)
	if !found {
		// Field does not exist; return the original slice
		return items, nil
	}

	// Iterate over the items and filter based on the field value
	for _, item := range items {
		itemValue := reflect.ValueOf(item)

		// Get the field value
		fValue := itemValue.FieldByName(field.Name)

		// Handle pointer to struct
		if fValue.Kind() == reflect.Ptr {
			if fValue.IsNil() {
				continue
			}
			fValue = fValue.Elem()
		}

    if fValue.Kind() == reflect.String {
      str := fValue.String()

      if strings.Contains(str, value) {
		  	filteredItems = append(filteredItems, item)
	    }
    }
  }
	return filteredItems, nil
}

func FilterByBool[T any](
  items []T, 
  fieldName string, 
  value string,
) ([]T, error) {
	var filteredItems []T

	// Get the type of T
	var tType reflect.Type
	if len(items) > 0 {
		tType = reflect.TypeOf(items[0])
	} else {
		return nil, errors.New("items slice is empty")
	}

	// Ensure T is a struct
	if tType.Kind() != reflect.Struct {
		return nil, errors.New("type T must be a struct")
	}

	// Check if the field exists
	field, found := tType.FieldByName(fieldName)
	if !found {
		// Field does not exist; return the original slice
		return items, nil
	}

	// Iterate over the items and filter based on the field value
	for _, item := range items {
		itemValue := reflect.ValueOf(item)

		// Get the field value
		fValue := itemValue.FieldByName(field.Name)

		// Handle pointer to struct
		if fValue.Kind() == reflect.Ptr {
			if fValue.IsNil() {
				continue
			}
			fValue = fValue.Elem()
		}

    if fValue.Kind() == reflect.Bool {
      data := fValue.Bool()

      if data == (value == "true") {
		  	filteredItems = append(filteredItems, item)
	    }
    }
  }

	return filteredItems, nil
}

func FilterByDataRange[T any](
  items []T, 
  fieldName string, 
  startStr string,
  endStr string,
) ([]T, error) {
	var filteredItems []T

	// Get the type of T
	var tType reflect.Type
	if len(items) > 0 {
		tType = reflect.TypeOf(items[0])
	} else {
		return nil, errors.New("items slice is empty")
	}

	// Ensure T is a struct
	if tType.Kind() != reflect.Struct {
		return nil, errors.New("type T must be a struct")
	}

	// Check if the field exists
	field, found := tType.FieldByName(fieldName)
	if !found {
		// Field does not exist; return the original slice
		return items, nil
	}

	// Iterate over the items and filter based on the field value
	for _, item := range items {
		itemValue := reflect.ValueOf(item)

		// Get the field value
		fValue := itemValue.FieldByName(field.Name)

		// Handle pointer to struct
		if fValue.Kind() == reflect.Ptr {
			if fValue.IsNil() {
				continue
			}
			fValue = fValue.Elem()
		}

    if fValue.Kind() == reflect.String {
      dateStr := fValue.String()
      date, err := time.Parse(time.RFC3339, dateStr)
      if err != nil {
        continue
      }
      start, err := time.Parse(time.RFC3339, startStr)
      if err != nil {
        continue
      }
      end, err := time.Parse(time.RFC3339, endStr)
      if err != nil {
        continue
      }

      if date.After(start) && date.Before(end) {
        filteredItems = append(filteredItems, item)
      }
    }
  }

	return filteredItems, nil
}

func deleteNilValue[T database.Identifiable](slice []T) []T {
  for i := range slice {
    if slice[i].GetId() == "nil" {
      return append(slice[:i], slice[i+1:]...)
    }
  }
  return slice
}
