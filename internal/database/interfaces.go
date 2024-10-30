package database

import ()

// Interface used to get the id in the server package. Used to delete
// the nil item
type Identifiable interface {
  GetId() string
}

func (i Zone) GetId() string {
  return i.Id
}
func (i Aisle) GetId() string {
  return i.Id
}
func (i Rack) GetId() string {
  return i.Id
}
func (i Shelf) GetId() string {
  return i.Id
}
func (i Category) GetId() string {
  return i.Id
}
func (i Subcategory) GetId() string {
  return i.Id
}
func (i Client) GetId() string {
  return i.Id
}
func (i Item_image) GetId() string {
  return i.Id
}
func (i Variant) GetId() string {
  return i.Id
}
func (i Operation) GetId() string {
  return i.Id
}
func (i Product) GetId() string {
  return i.Id
}
func (i ProductImage) GetId() string {
  return i.Id
}
func (i Supplier) GetId() string {
  return i.Id
}
func (i SupplierCode) GetId() string {
  return i.Id
}
func (i TicketState) GetId() string {
  return i.Id
}
func (i TicketType) GetId() string {
  return i.Id
}
func (i Ticket) GetId() string {
  return i.Id
}
func (i User) GetId() string {
  return i.Id
}
