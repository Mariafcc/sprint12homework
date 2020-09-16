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
