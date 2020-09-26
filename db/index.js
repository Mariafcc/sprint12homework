const connection = require("./connection");

const db = () => {};

db.addDepartment = (department) => {
  return connection.query("INSERT IGNORE INTO department SET ?", department);
};
db.addRole = (role) => {
  return connection.query("INSERT IGNORE INTO role SET ?", role);
};
db.addEmployee = (employeeQ) => {
  return connection.query("INSERT IGNORE INTO employee SET ?", employeeQ);
};
db.viewDepartment = () => {
  return connection.query(
    "SELECT d.id, d.name, sum(r.salary) budget FROM department d LEFT JOIN role r ON d.id = r.department_id GROUP BY d.id, d.name ORDER BY d.id"
  );
  /*
  return connection.query(
    "SELECT department.id, department.name, SUM (role.salary) AS budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id  GROUP BY department.id, department.name"
  );
  */
};
db.viewRole = () => {
  return connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
  );
};
db.viewEmployee = () => {
  return connection.query(
    "SELECT employee.id, employee.firstName, employee.lastName, role.title, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
  );
};
db.updateEmployee = (roleId, employeeId) => {
  return connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", [
    roleId,
    employeeId,
  ]);
};
db.updateEmpMan = (managerId, employeeId) => {
  return connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [
    managerId,
    employeeId,
  ]);
};
db.deleteDep = (depId) => {
  connection.query("DELETE FROM role WHERE department_id = ?", [depId]);
  connection.query("DELETE FROM department WHERE id= ?", [depId]);
  return true;
};

db.deleteRole = (roleId) => {
  return connection.query("DELETE FROM role WHERE id = ? ", [roleId]);
};

module.exports = db;
