DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE users (
  id serial, 
  email varchar(255) NOT NULL, 
  password varchar(255) NOT NULL,
  role varchar(255) 
);
