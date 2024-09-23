# Modules map

List of modules needed for the application

## ./zones, ./aisles, ./racks, ./shelfs

### ./create
- [ ] ./create/ZoneCreateDialog.tsx 
- [ ] ./create/form/ZoneCreateForm.tsx
- [ ] ./create/form/action.ts

### ./createInBulk
- [ ] ./create/ZoneBulkCreateDialog.tsx
- [ ] ./create/form-bulk/ZoneBulkCreateForm.tsx
- [ ] ./create/form-bulk/action.ts

### ./replace
- [ ] ./replace/ZoneReplaceDialog.tsx
- [ ] ./replace/form/ZoneReplaceForm.tsx
- [ ] ./replace/form/action.ts

### ./update
- [ ] ./update/ZoneUpdateDialog.tsx
- [ ] ./update/form/ZoneUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./retrieve
- [ ] ./retrieve/ZoneCard.tsx
- [ ] ./retrieve/ZoneCardsGrid.tsx


## ./category, ./subcategory

### ./create
- [ ] ./create/CategoryCreateDialog.tsx
- [ ] ./create/form/CategoryCreateForm.tsx
- [ ] ./create/form/action.ts

### ./replace
- [ ] ./replace/CategoryReplaceDialog.tsx
- [ ] ./replace/form/CategoryReplaceForm.tsx
- [ ] ./replace/form/action.ts

### ./retrieve
- [ ] ./retrieve/CategoryCard.tsx
- [ ] ./retrieve/CategoryCardsList.tsx


## ./items

### ./create
- [ ] ./create/ItemCreatePage.tsx
- [ ] ./create/form/ItemCreateForm.tsx
- [ ] ./create/form/action.ts

### ./remove
- [ ] ./remove/ItemRemoveDialog.tsx
- [ ] ./remove/action.ts                // needs to delete related data

### ./retrieve
- [ ] ./retrieve/ItemsTable.tsx
- [ ] ./retrieve/ItemCardWithCodes.tsx
- [ ] ./retrieve/ItemsCardWithCodesList.tsx

### ./update
- [ ] ./update/ItemEditPage.tsx
- [ ] ./update/form/ItemEditForm.tsx
- [ ] ./update/form/action.ts


## Variants

### ./create

- [ ] ./create/VariantCreateSheet.tsx
- [ ] ./create/form/VariantCreateForm.tsx
- [ ] ./create/form/action.tsx
- [ ] ./create/form/actionItemForm.tsx

### ./edit
- [ ] ./update/VariantEditSheet.tsx
- [ ] ./update/form/VariantEditForm.tsx
- [ ] ./update/form/action.tsx
- [ ] ./update/form/actionItemForm.tsx

We have both action and actionItemForm because we want to be able
to add directly to DB and add to a queue for subsequential DB insertion.
We could access one or the other by passing it? So like we have a prop
in the VariantEditSheet that is like pushToDb: true | false,  that you
can check true to have a specific prop beign passed.

### ./remove
- [ ] ./remove/VariantRemoveDialog.tsx
- [ ] ./remove/action.ts

### ./retrieve
- [ ] ./retrieve/VariantsTable.tsx


## Supplier

### ./create
- [ ] ./create/SupplierCreateDialog.tsx
- [ ] ./create/form/SupplierCreateForm.tsx
- [ ] ./create/form/action.ts

### ./replace
- [ ] ./replace/SupplierReplaceDialog.tsx
- [ ] ./replace/form/SupplierReplaceForm.tsx
- [ ] ./replace/form/action.ts

### ./update
- [ ] ./update/SupplierUpdateDialog.tsx
- [ ] ./update/form/SupplierUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./retrieve
- [ ] ./retrieve/SupplierCard.tsx
- [ ] ./retrieve/SupplierCardsGrid.tsx


## SupplierCode

### ./create
- [ ] ./create/SupplierCodeCreateDialog.tsx
- [ ] ./create/form/SupplierCodeCreateForm.tsx
- [ ] ./create/form/action.ts

### ./remove
- [ ] ./replace/SupplierCodeRemoveDialog.tsx
- [ ] ./replace/form/SupplierCodeRemoveForm.tsx
- [ ] ./replace/form/action.ts

### ./update
- [ ] ./update/SupplierCodeUpdateDialog.tsx
- [ ] ./update/form/SupplierCodeUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./retrieve
- [ ] ./retrieve/SupplierCodesRow.tsx
- [ ] ./retrieve/SupplierCodesTable.tsx


## Transitions

### ./create
- [ ] ./create/TransitionCreateDialog.tsx
- [ ] ./create/form/TransitionCreateForm.tsx
- [ ] ./create/form/action.ts

### ./retrieve

You cannot edit / retrieve a transition. Reason why is that a transition
is an immutable object by definition. Imagine that you created a transition
that adds 10 items, then another that removes 5. If you then remove the 
first transition you'll be getting -5 as a result. So if you fuck up,
you create another transition? For now yes.


## Tickets
Tickets kinda work like items, so they basically unite different things.
In this case is clients and products.
Both of them would be select fields and both of them will have a 
plus icon to add new stuff.
They will basically be like category and subcategory, so like one filters
the other. You select a client and then you select the product
of said client.

### ./create
- [ ] ./create/TicketCreatePage.tsx
- [ ] ./create/form/TicketCreateForm.tsx
- [ ] ./create/form/action.ts

### ./update
- [ ] ./update/TicketUpdatePage.tsx
- [ ] ./update/form/TicketUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./delete
- [ ] ./delete/TicketDeleteDialog.tsx
- [ ] ./delete/action.ts

### ./retrieve
how would the tickets be shown? I would say that for now a table is more
then enough. In a second instance we could add in a kaban board.

- [ ] ./retrieve/TicketsTable.tsx


## Products

### ./create
- [ ] ./create/ProductCreateSheet.tsx
- [ ] ./create/form/ProductCreateForm.tsx
- [ ] ./create/form/action.ts

### ./update
- [ ] ./update/ProductUpdateSheet.tsx
- [ ] ./update/form/ProductUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./delete
- [ ] ./delete/ProductDeleteDialog.tsx
- [ ] ./delete/action.ts

### ./retrieve
- [ ] ./retrieve/ProductCard.tsx
- [ ] ./retrieve/ProductCardsGrid.tsx


## Clients

### ./create
- [ ] ./create/ClientCreateSheet.tsx
- [ ] ./create/form/ClientCreateForm.tsx
- [ ] ./create/form/action.ts

### ./update
- [ ] ./update/ClientUpdateSheet.tsx
- [ ] ./update/form/ClientUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./delete
- [ ] ./delete/ProductDeleteDialog.tsx
- [ ] ./delete/action.ts

### ./retrieve
- [ ] ./retrieve/ClientRow.tsx
- [ ] ./retrieve/ClientsTable.tsx


## ImagesItem

### ./retrieve
- [ ] ./retrieve/ItemImagesList.tsx
- [ ] ./retrieve/ItemImage.tsx

In the single component you'll have to insert the delete / update buttons.
That would be visible only on hover of the image.

### ./delete
- [ ] ./delete/ItemImageDeleteDialog.tsx
- [ ] ./delete/action.ts

### ./update
- [ ] ./update/ItemImageUpdateDialog.tsx
- [ ] ./update/form/ItemImageUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./create 
- [ ] ./create/ItemImagesCreateDialog.tsx
- [ ] ./create/form/ItemImageCreateForm.tsx
- [ ] ./create/form/action.ts


## ImagesProducts

### ./retrieve
- [ ] ./retrieve/ProductImagesList.tsx
- [ ] ./retrieve/ProductImage.tsx

### ./delete
- [ ] ./delete/ProductImageDeleteDialog.tsx
- [ ] ./delete/action.ts

### ./update
- [ ] ./update/ProductImageUpdateDialog.tsx
- [ ] ./update/form/ProductImageUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./create 
- [ ] ./create/ProductImagesCreateDialog.tsx
- [ ] ./create/form/ProductImageCreateForm.tsx
- [ ] ./create/form/action.ts


## Ticket Type

### ./create
- [ ] ./create/TicketTypeCreateDialog.tsx
- [ ] ./create/form/TicketTypeCreateForm.tsx
- [ ] ./create/form/action.ts

### ./update
- [ ] ./update/TicketTypeUpdateDialog.tsx
- [ ] ./update/form/TicketTypeUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./replace
- [ ] ./replace/TicketTypeReplaceDialog.tsx
- [ ] ./replace/form/TicketTypeReplaceForm.tsx
- [ ] ./replace/form/action.ts

### ./retrieve
- [ ] ./retrieve/TicketTypeLabel.tsx
- [ ] ./retrieve/TicketTypeLabelsList.tsx

- [ ] ./retrieve/TicketTypeRow.tsx
- [ ] ./retrieve/TicketTypeTable.tsx

The difference between the label and the row is that the row has the
actions 

## Ticket State
### ./create
- [ ] ./create/TicketStateCreateDialog.tsx
- [ ] ./create/form/TicketStateCreateForm.tsx
- [ ] ./create/form/action.ts

### ./update
- [ ] ./update/TicketStateUpdateDialog.tsx
- [ ] ./update/form/TicketStateUpdateForm.tsx
- [ ] ./update/form/action.ts

### ./replace
- [ ] ./replace/TicketStateReplaceDialog.tsx
- [ ] ./replace/form/TicketStateReplaceForm.tsx
- [ ] ./replace/form/action.ts

### ./retrieve
- [ ] ./retrieve/TicketStateLabel.tsx
- [ ] ./retrieve/TicketStateLabelsList.tsx

- [ ] ./retrieve/TicketStateRow.tsx
- [ ] ./retrieve/TicketStateTable.tsx
