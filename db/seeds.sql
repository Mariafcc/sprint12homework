USE employee_DB

INSERT INTO department (name)
VALUES 
("sales"), 
("engineer"),
("legal"),
("HR")

INSERT INTO role (title, salary, department_id)
VALUES 
("sales person", 18, 1),
("developer", 25, 2),
("lawyer", 40, 3),
("HR rep", 30, 4)

INSERT INTO employee (firstName, lastName, role_id, manager_id)
VALUES 
("Jane", "Smith", 1, 3),
("Harry", "Potter", 2, 1),
("Sam", "Jones", 3, 2),
("Jessica", "Parker", 4, NULL)