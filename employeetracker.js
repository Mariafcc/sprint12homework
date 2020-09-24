var inquirer = require("inquirer");
var db = require("./db");
require("console.table");

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all departments",
        "View all managers",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Department",
        // "Delete Role",
        // "Delete employee",
      ],
    })
    .then(function (answer) {
      if (answer.action === "View all Employees") {
        viewEmp();
      }
      if (answer.action === "View department") {
        viewDep();
      }
      if (answer.action === "View managers") {
        viewRoles();
      }
      if (answer.action === "Add Employee") {
        addEmp();
      }
      if (answer.action === "Add Department") {
        addDep();
      }
      if (answer.action === "Add Role") {
        addRoles();
      }
      if (answer.action === "Update Employee Role") {
        updateEmpRole();
      }
      if (answer.action === "Update Employee Manager") {
        updateEmpMan();
      }
      if (answer.action === "Delete Department") {
        deleteD();
      }
      // if (answer.action === "Delete Role") {
      // }
      // if (answer.action === "Delete employee") {
      // }
    });
}

const viewEmp = async () => {
  const employees = await db.viewEmployee();
  console.table(employees);
  start();
};

const viewDep = async () => {
  const departments = await db.viewDepartment();
  console.table(departments);
  start();
};

const viewRoles = async () => {
  const roles = await db.viewRole();
  console.table(roles);
  start();
};

const addEmp = async () => {
  // const employees = await db.viewEmployee();
  const roles = await db.viewRole();
  const employeeQ = await inquirer.prompt([
    {
      name: "firstName",
      message: "What is employees first name?",
    },
    {
      name: "lastName",
      message: "What is employees last name?",
    },
  ]);
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is employees role?",
    choices: roleChoices,
  });
  employeeQ.role_id = roleId;
  await db.addEmployee(employeeQ);
  start();
};

const addDep = async () => {
  const department = await inquirer.prompt({
    name: "name",
    message: "what is the name of the department?",
  });
  await db.addDepartment(department);
  start();
};

const addRoles = async () => {
  const departments = await db.viewDepartment();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const role = await inquirer.prompt([
    {
      name: "title",
      message: "Name of role?",
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
    },
    {
      name: "department_id",
      type: "list",
      message: "Which department does the role belong to?",
      choices: departmentChoices,
    },
  ]);
  await db.addRole(role);
  start();
};

const updateEmpRole = async () => {
  const employees = await db.viewEmployee();
  const employeeChoices = employees.map(({ id, firstName, lastName }) => ({
    name: `${firstName} ${lastName}`,
    value: id,
  }));
  const { employeeId } = await inquirer.prompt([
    {
      name: "employeeId",
      type: "list",
      message: "What employee role will be updated?",
      choices: employeeChoices,
    },
  ]);
  const roles = await db.viewRole();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { roleId } = await inquirer.prompt([
    {
      name: "role_id",
      type: "list",
      message: "What role will be assigned?",
      choices: roleChoices,
    },
  ]);
  await db.updateEmployee(employeeId, roleId);
  start();
};

const updateEmpMan = async () => {
  const employees = await db.viewEmployee();
  const employeeChoices = employees.map(({ id, firstName, lastName }) => ({
    name: `${firstName} ${lastName}`,
    value: id,
  }));
  const { employeeId } = await inquirer.prompt([
    {
      name: "employeeId",
      type: "list",
      message: "What employee will be updated?",
      choices: employeeChoices,
    },
  ]);
  const manager = await db.viewEmployee();
  const managerChoice = manager.map(({ id, firstName, lastName }) => ({
    name: `${firstName} ${lastName}`,
    value: id,
  }));
  const { managerId } = await inquirer.prompt([
    {
      name: "managerId",
      type: "list",
      message: "Who should the new manager be?",
      choices: managerChoice,
    },
  ]);
  await db.updateEmpMan(managerId, employeeId);
  start();
};

const deleteD = async () => {
  const department = await db.viewDepartment();
  const departmentChoices = department.map(({ id, name }) => ({
    name: `${name}`,
    value: id,
  }));
  const { name } = await inquirer.prompt({
    name: "name",
    type: "list",
    message: "Which department would you like to remove?",
    choices: departmentChoices,
  });
  await db.deleteDep(id, name);
  start();
};

start();
