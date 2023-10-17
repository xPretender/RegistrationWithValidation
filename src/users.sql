CREATE TABLE users(
    id INTEGER PRIMARY KEY ,
    username VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users(username, first_name,last_name, password, email)
VALUES('admin', 'admin', 'admin', 'admin', 'admin');

SELECT * FROM users;
```
drop TABLE users;
```