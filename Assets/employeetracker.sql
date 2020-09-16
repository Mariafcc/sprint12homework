DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
    name VARCHAR
    (30),
    PRIMARY KEY
    (id)
);
CREATE TABLE role
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
    title VARCHAR
    (30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY
    (id)
);
CREATE TABLE employee
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
    firstName VARCHAR
    (30),
    lastName VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER NOT NULL
);
