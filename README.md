# Contacts Snapshot starter project
![alt text](Desktop/Screen%20Shot%202018-03-27%20at%203.42.45%20PM.png)

## Folder Structure
```
contacts-snapshot-starter
  ├── package-lock.json
  ├── package.json
  ├── public
  │   ├── script.js
  │   └── style.css
  ├── src
  │   ├── models
  │   │   ├── contacts.js
  │   │   └── db
  │   │       ├── contacts.js
  │   │       ├── db.js
  │   │       ├── login.js
  │   │       ├── schema
  │   │       │   └── schema.sql
  │   │       ├── signup.js
  │   │       └── users.js
  │   ├── server
  │   │   ├── middlewares.js
  │   │   ├── routes
  │   │   │   ├── auth.js
  │   │   │   ├── contacts.js
  │   │   │   └── index.js
  │   │   └── utils.js
  │   ├── server.js
  │   └── views
  │       ├── auth
  │       │   ├── login.ejs
  │       │   └── signup.ejs
  │       ├── common
  │       │   └── not_found.ejs
  │       ├── contacts
  │       │   ├── index.ejs
  │       │   ├── new.ejs
  │       │   └── show.ejs
  │       └── partials
  │           ├── footer.ejs
  │           ├── header.ejs
  │           └── nav.ejs
  └── test
      ├── end-to-end
      │   └── contacts.test.js
      ├── helpers
      │   └── db.js
      ├── integration
      │   └── db
      │       └── contacts.test.js
      └── seed
          ├── contacts.sql
          └── master-admin-user.sql
```

## Dev Setup

1. Create your database: `createdb contacts_development`
1. Load your database with the schema: `npm run load_schema`
1. Install your dependencies: `npm install`
1. Run the server: `nodemon`
