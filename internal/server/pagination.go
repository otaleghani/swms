package server

import (
  "math"
  "strconv"

)

// Takes the page query params (string) and return a valid number
// to use for pagination
func convertPageQueryToIntOrDefault(s string) int {
    num, err := strconv.Atoi(s)
    if err != nil {
        return 1
    }
    return num
}

// Converts the perPage query parameter (string) and return a valid
// number to use for validation
func convertPerPageQueryToIntOrDefault(s string) int {
    num, err := strconv.Atoi(s)
    if err != nil {
        return 10
    }
    if num == 0 {
        return 10
    }
    return num
}

func paginateItems[T any](
  queryPage string,
  queryPerPage string,
  rows []T,
) (
  items []T, 
  page int,
  perPage int,
  totalItems int,
  totalPages int,
  err error) {
    totalItems = len(rows)
    page = convertPageQueryToIntOrDefault(queryPage)
    perPage = convertPerPageQueryToIntOrDefault(queryPerPage)

    totalPages = int(math.Ceil(float64(totalItems) / float64(perPage)))
    if page > totalPages {
      page = 1
    }

    start := 0 + (perPage * (page - 1))
    end := perPage + (perPage * (page - 1))

    if end >= totalItems {
      end = totalItems
    }

    resultedItems := rows[start:end]

    return resultedItems, page, perPage, totalItems, totalPages, nil
}
