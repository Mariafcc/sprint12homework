DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department
(
    id INTEGER UNSIGNED
    AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
    (30) UNIQUE NOT NULL
);
CREATE TABLE role
(
    id INTEGER UNSIGNED
    AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR
    (30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL,
    INDEX dep_ind(department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
CREATE TABLE employee
(
    id INTEGER UNSIGNED
    AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR
    (30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    manager_id INTEGER UNSIGNED,
    INDEX man_ind (manager_id),
    -- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE CASCADE,
);

