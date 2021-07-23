# Assignment 6

---

Setup a back end server for the previous application. This needs to be a separate application. Create CRUD APIs (REST) for user model. Store data in JSON file. Use that as source of data. UI functionality should remain same. Everything should be in TS. Use express for REST APIs. Push the code to a separate repo on github. Generate a PR for review.

# Assignment 7

---

Setup a postgres DB for the previous application. Replace JSON with the new DB created. Push the code to the repo on github. Generate a PR for review.

# Assignment 8

---

Add a customers table and roles table in DB. Customer table columns - name, website, address. Role columns - name, key (must be from enum), description. Each user can belong to one customer and have one role. Change the DB schema accordingly. Show customer name and role name for each user in UI. Push the code to the repo on github. Generate a PR for review.

## Libraries Used

- Express
- ES6
- nodemon for server restart
- CORS to follow CORS policy

## How to run

inside folder server run

> npm run dev

inside folder client run

> npm start

run client on http://localhost:8080/ as it is used in CORS policy in server

- Create db entries and run db at port http://localhost:5432
