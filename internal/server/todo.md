# To do server

## Cache
It would be really beneficial to have 2 kinds of cache

- one from the results of the database
- one from the request side of things

The idea is that the db would have some queries cached and ready to go
and those cache would be revalidated only after a post, put or delete request. 
This would cut the amount of time needed to retrieve data from the db.

Also the get request could be cached, so that the result could be sent
instantly without querying the db or paginating the result.
