/********************************************************************

Author      Oliviero Taleghani
Date        2024-05-02

Description
  Part of the database package and entry point. Responsible for
  - Creating a new database
  - Deleting an existing database

Usage

func CreateDatabase(path string) error
  Creates the database file at the given path and initializes it.

Dependency
	"os"

Todo
  - [x]     Clenup
  - [x]     Database creation if no db is present.
  - [x]     Delete database on specified location

Changelog
  [0.0.3]   2024-05-08
  Chore     Cleanup and revision to accomodate the new queries.
            Deleted old unused functions.

  [0.0.2]   2024-05-02
  Add       deleteDatabase

  [0.0.1]   2024-05-02
  Added     Initial release

********************************************************************/

package database

import (
	"os"
)

func CreateDatabase(path string) error {
	if err := create(Item{}, path); err != nil { return err }

	return nil
}

func deleteDatabase(path string) error {
	if err := os.Remove(path); err != nil { return err }

	return nil
}
