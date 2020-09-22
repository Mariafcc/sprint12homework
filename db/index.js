const connection = require("./connection");

const db = () => {};

db.addDepartment = (department) => {
  return connection.query("INSERT INTO department SET ?", department);
};
db.addRole = (role) => {
  return connection.query("INSERT INTO role SET ?", role);
};
db.addEmployee = (employee) => {
  return connection.query("INSERT INTO employee SET ?", employee);
};
db.viewDepartment = () => {
  return connection.query(
    "SELECT department.id, department.name, SUM (role.salary) AS budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id  GROUP BY department.id, department.name"
  );
};
db.viewRole = () => {
  return connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
  );
};
db.viewEmployee = () => {
  return connection.query(
    "SELECT employee.firstName, employee.lastName, role.title, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
  );
};
db.updateEmployee = (roleId, employeeId) => {
  connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
    roleId,
    employeeId,
  ]);
};
db.updateEmpMan = (managerId, employeeId) => {
  connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [
    managerId,
    employeeId,
  ]);
};
// db.deleteDep = () => {
//   connection.query("DELETE FROM department WHERE id = ?");
// };

module.exports = db;
