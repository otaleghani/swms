There are different types of data that the client has to "manage".

## Lists

Lists are divided into two groups

### Complete lists
This are used in comboboxes, so they need to be complete.
This kind of lists are updated on the client list level, so that we can
manage just one instance. This is their behaviour:

- on create: push the item inside of the array
- on update: updates the edited element
- on remove: deletes the item
- on replace: deletes the item 

You have to keep in mind that comboboxes do not care about anything
than name and id.

### Paginated lists
Here we have paginated lists, which handles primarly create and remove 
actions. Reason why is because the update is managed by the elements.

Here we just add some guard rails to do certain actions and to propt
the user to do a full refresh if the data could broke the ui.

Basically it works like this:

- on create: if the lenght of the current page is less than the total item per page, we add the item in the array
- on remove / replace: if the item is in the current page and the current page array lenght is less than the total items per page, we just remove the item. Else we propt the user to refresh the page. Reason why is that we would need to ask the next item in the page to the server. That thing is not possible right now.

#### Asking for the next item
We could for example do something like this: passing to this function total items, page capacity, number of pages. Here if the current page gets an item deleted and said collection has a next page, we could ask for the next item to the server. Something like
 
``` js
const request = fetch(endpoint,{
    // different headers...
    body: {
        page: pageNumber
    }
});
```
And the server could response with the first item of the next page. But then we would need to update the server list for chaning the pagination... That's a tradeoff.

### Element
Instead of having one big state containing the hole object, if I divide things up it could actually become easier to manage every state.

Reason why is that I can pass the id and the data to this element and then use a simpler syncher to achieve the same result.

# Component design
### Server list
- manages initial fetch
- manages filters and pagination
- server component (closer to the actual database)
- caches every page for faster load times

### Client list
- manages synchronizers for lists and paginated lists
- renders the cards
- client component

### Card


- Card 
- Element
