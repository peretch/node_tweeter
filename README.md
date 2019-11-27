# @peretch/node_tweeter
This project is an example of an implementation of tweeter with nodejs.

## Technologies
1. Express
2. Mongoose
3. Bcrypt
4. Jwt
5. body-parser

## Models & Schemas
1. User
2. Tweet

## API's endpoints

### Users
#### /users [POST]
Creates a new user and gives one token to interact with all the APIs.
#### /users/:userId [PUT] 
Given an userId and a bearer token, updates User's information.

### Sessions
#### /sessions [POST]
Given an email and his password, returns a token to interact with all the APIs.