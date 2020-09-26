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
        "View departments",
        "View managers",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Department",
        "Delete Role",
      ],
    })
    .then(function (answer) {
      if (answer.action === "View all Employees") {
        viewEmp();
      }
      if (answer.action === "View departments") {
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
      if (answer.action === "Delete Role") {
        deleteR();
      }
      // if (answer.action === "Delete employee") {
      // }
    });
}

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
  const department = await db.viewDepartment();
  const depChoices = department.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const departmentQ = await inquirer.prompt({
    name: "name",
    message: "what is the name of the department?",
    choices: depChoices,
  });
  await db.addDepartment(departmentQ);
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
  console.table(viewRoles);
  start();
};

const updateEmpRole = async () => {
  const employees = await db.viewEmployee();
  const employeeChoices = employees.map(({ id, firstName, lastName }) => ({
    name: `${firstName} ${lastName}`,
    value: id,
  }));
  console.log(employeeChoices);
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
      name: "roleId",
      type: "list",
      message: "What role will be assigned?",
      choices: roleChoices,
    },
  ]);
  console.log(employeeId, roleId);
  await db.updateEmployee(roleId, employeeId);
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
  const departmentChoices = department.map(({ name, id }) => ({
    name: `${name}`,
    value: id,
  }));
  const { depId } = await inquirer.prompt({
    name: "depId",
    type: "list",
    message: "Which department would you like to remove?",
    choices: departmentChoices,
  });
  console.table(departmentChoices);
  await db.deleteDep(depId);
  start();
};
const deleteR = async () => {
  const role = await db.viewRole();
  const roleChoices = role.map(({ title, id }) => ({
    name: `${title}`,
    value: id,
  }));
  const { roleId } = await inquirer.prompt({
    name: "roleId",
    type: "list",
    message: "Which role would you like to remove?",
    choices: roleChoices,
  });
  console.log(roleId);

  await db.deleteRole(roleId);
  start();
};

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

start();
