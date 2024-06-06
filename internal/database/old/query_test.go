package database

import (
	"fmt"
	"testing"
  "github.com/otaleghani/spg"
)

var path = "out/database.db"


func Test_DeleteDatabase(t *testing.T) {
  fmt.Println(spg.FullName("en", "camel", " "))
	err := deleteDatabase(path)
	if err != nil {
		t.Fatal(err)
	}
}

func Test_CreateDatabase(t *testing.T) {
	err := CreateDatabase(path)
	if err != nil {
		t.Fatal(err)
	}
}

func Test_AddItem(t *testing.T) {
	item := Item{
		Id:             "1",
		Name:           "Alberto",
		Description:    "Something",
		Archived:       false,
		Position_id:    "69",
		Category_id:    "spicy content",
		SubCategory_id: "some other spicyness",
	}
	item2 := Item{
		Id:             "2",
		Name:           "Angela",
		Description:    "Something",
		Archived:       false,
		Position_id:    "69",
		Category_id:    "spicy content",
		SubCategory_id: "some other spicyness",
	}

	err := add(item, path)
	err = add(item2, path)
	if err != nil {
		t.Fatal(err)
	}
}

func TestGetItems(t *testing.T) {
	// How do I...
	// items, err := GetItems(Item{}, path, "name = \"Angela\"")
  items := []Table{}
  err := Select(&items, Item{}, path, "")
	if err != nil {
		t.Fatal(err)
	}
	fmt.Println(items)
}

func TestGetSingleItem(t *testing.T) {
  items, err := GetItemById(Item{Id:"1"}, path)
	if err != nil {
		t.Fatal(err)
	}
	fmt.Println(items)
}

func TestUpdateItem(t *testing.T) {
	item := Item{
		Id:          "1",
		Name:        "69",
		Description: "sandro",
		Archived:    true,
		Position_id: "position",
		//Category_id:"category",
		// SubCategory_id:"subcat",
	}
	// err := PutItem(path, item)
	// if err != nil {
	//   t.Fatal(err)
	// }
	err := update(item, path)
	if err != nil {
		t.Fatal(err)
	}
}

func TestGetSingleItem2(t *testing.T) {
  _, err := GetItemById(Item{Id:"1"}, path)
	if err != nil {
		t.Fatal(err)
	}
}

func TestAddFunction(t *testing.T) {
	item := Item{
		Id:             "2",
		Name:           "69",
		Description:    "sandro",
		Archived:       true,
		Position_id:    "position",
		Category_id:    "category",
		SubCategory_id: "subcat",
	}

	err := add(item, path)
	if err != nil {
		t.Fatal(err)
	}
}

func TestDeleteFunction(t *testing.T) {
	item := Item{
		Id:             "2",
		Name:           "69",
		Description:    "sandro",
		Archived:       true,
		Position_id:    "position",
		Category_id:    "category",
		SubCategory_id: "subcat",
	}
	err := delete(item, path)
	if err != nil {
		t.Fatal(err)
	}
}
