package database

type Category struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
}

type Subcategory struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
  Category_id string `json:"category"`
}
