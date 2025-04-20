const employees = [
  {
    firstName: "Sam",
    department: "Tech",
    designation: "Manager",
    salary: 40000,
    raiseEligible: true,
  },
  {
    firstName: "Mary",
    department: "Finance",
    designation: "Trainee",
    salary: 18500,
    raiseEligible: true,
  },
  {
    firstName: "Bill",
    department: "HR",
    designation: "Executive",
    salary: 21200,
    raiseEligible: false,
  },
];

console.log("Problem 1");
console.log(JSON.stringify(employees, null, "\t"));

const company = {
  companyName: "Tech Stars",
  website: "www.techstars.site",
  employees: employees,
};

console.log("Problem 2");
console.log(JSON.stringify(company, null, "\t"));

company.employees.push({
  firstName: "Anna",
  department: "Tech",
  designation: "Executive",
  salary: 25600,
  raiseEligible: false,
});

console.log("Problem 3");
console.log(JSON.stringify(company, null, "\t"));

let totalSalary = 0;
company.employees.forEach((employee) => {
  totalSalary += employee.salary;
});

console.log("Problem 4");
console.log("$:" + totalSalary);

employees.forEach((employee) => {
  if (employee.raiseEligible) {
    employee.salary += employee.salary * 0.1;
    employee.raiseEligible = false;
  }
});

console.log("Problem 5");
console.log(JSON.stringify(company, null, "\t"));

const wfhEmployees = ["Anna", "Sam"];
company.employees.forEach((employee) => {
  employee.wfh = wfhEmployees.includes(employee.firstName);
});
console.log("Problem 6");
console.log(JSON.stringify(company, null, "\t"));
