here I have to build the actual page and the view how to make this sync. RIght now this page feels really heavy.

Maybe I could change the "how" to show things on the page.

Right now it uses

item => variants => codes, 

which results in a nest of 2 layers. Not ideal if you want to update clientside every single item.

Maybe you could do something like showing the items that use said supplier.

Like supplier/{id}/items

Or maybe even better, you could create a list of variants like this

- You pass the items list and variants list to the component,
- Render the supplier code and variant name and item name by finding them
- handle everything with a simple generic element / list


Maybe it's better instead of calling really heavy db computation for a side page.
