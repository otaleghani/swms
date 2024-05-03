# Database pkg

Used to interface with SQLite.


## Table definition

### Item
When you want to delete an item the item will just set to archive
true.

- id                id primary key
- name              string
- description       string
- position          reference position
- archive           bool
- category          reference category
- sub-category      reference sub-category

#### Composite
What about "ikea items"? Like items that are the union of more items.
I could just reference one item in other items

- id                id primary key
- id item           reference parent item
- id other item     reference child item

#### Category
- id
- name
- description

#### Sub-category
- id                id primary key
- name              string
- description       string
- category id       reference category

#### Suppier codes
Sqlite doesn't support arrays. So you should divide into smaller
columns the data that should be rappresented as an array.

- id                id primary key
- supplier code     string
- item id           reference item
- variant id        reference variant
- supplier id       reference supplier

#### Images
Images is a one to many reference, so you will SELECT * FROM images,
not the other way around. You do not need a reference in items. The
same is true for supplier code.

- id                id primary key
- uri               string
- item id           reference item
- variant id        reference variant

#### Position
- id                id primary key
- zone              string
- aisle             string
- rack              string
- shelf             string

#### Variants
We could say that by default every item has at least one variant. We
can then add other variants if we see fit, but it's an optional thing.
The idea is that the name of the variant should complete the name of
the item, rather than substitute it. So if we could have:

Black Lather Jacket     -> Name of item
Black Lather Jacket xl  -> Name of variant
Black Lather Jacket md  -> Name of variant

So basically whenever we create an item we also create a default
variant that has a fixed name, even like no name at all, so that we
could just reference it whenever we are displaying a single item with
no variant.

- id                id primary key
- name              string
- description       string
- quantity          int
- internal id       string
- length            int
- width             int
- height            int
- weight            int
- item id           reference item 
- default variant   boolean

### Supplier

- id                id primary key
- name              string
- description       string

### User
- id                id primary key
- name              string
- surname           string
- email             string
- password          string 

### revoked token
I could even use the token itself as a form of id.

- id                id primary key
- token             string
- time              num

### transision

Holds the warehouse movements and who did them. Basically whenever a
product is added, modified or deleted a new transision is created. 
A transision is just a reference of the warehouse movement. It holds
just the type of product, the quantity and the person responsible for
said transision.
Whenever a warehouse movement "happens" a transision is created with
the number of products used and then the product entry is updated
based on that number.

- id
- user id
- product id
- quantity 
- date

### tools
A tool is kinda like an item. The only thing is that a tool istance is
usually just used for checking the position in the warehouse.

- id                id primary key
- name              string
- description       string
- quantity          int
- internal id       string
- length            int
- width             int
- height            int
- weight            int

#### Images

- id                id primary key
- uri               string
- tool is           reference tool

### products
Imagine items as components used for making, repaing and modifing
products.

- id                id primary key
- name              string
- description       string
- quantity          int
- internal id       string
- length            int
- width             int
- height            int
- weight            int
- state             string              
  rented / available / sold / under repair etc. 
  the state could be set automatically based on the last ticket?
  If there are no open ticket is available.
  If a rent ticket is open, the machine is rented
  If a repair ticket is open, the machine in under maintainence

  SELECT name FROM ticket_state WHERE tickets.product = product

- owner

#### image

- id                id primary key
- uri               string
- tool is           reference tool

#### movements

- id                id primary key
- user id           reference user
- machine id        reference machine
- quantity          int
- date              data

### client

- id                id primary key
- name              string
- address           string
- business          boolean

### tickets -> repairs, rent etc. 

- id                id primary key
- name              string 
- description       string
- open date         date
- close date        date
- client id         reference client
- product id        reference product
- type id           reference to type
- state id          reference state
  open / closed / in progress
  repair, rent, whatever you want

#### tickets types

- id
- name
- description

#### ticket state

- id 
- name
- description

#### items used in ticket

- id
- ticket id
- item id
