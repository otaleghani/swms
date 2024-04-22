## Package server

This package will take care of the server side of things.

It will need:
- logger for every single thing 
- handler functions for every endpoint
- middleware functions

# DB STUFF
You will find most of the code that you will need inside of the debian WLS in the test of go + sqlite. I think that you will need to install sqlite too in the machine.

## Important functions
- [ ] Create database on specified location or on default location
- [ ] drop database
- [ ] check if database is present or not
- [ ] Connect to existing db

## Big questions
- How do I handle pagination?

## SQL queries
- Select all products

## The basics
A RWMutex will be used to handle various writes and reads.

The Database type will have a Path to the db file.

