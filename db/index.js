const connection = require("./connection");

class Db {
  constructor(connection) {
    this.connection = connection;
  }

  addDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }
  addRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }
  addEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  viewDepartment() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM (role.salary) AS budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id  GROUP BY department.id, department.name"
    );
  }
  viewRole() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
    );
  }
  viewEmployee() {
    return this.connection.query(
      "SELECT employee.firstName, employee.lastName, role.title, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
    );
  }
  updateEmployee(roleId, employeeId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
  deleteDep() {
    return this.connection.query("DELETE FROM department WHERE id = ?");
  }
}

module.exports = Db;
