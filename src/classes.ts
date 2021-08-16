class Department {
  // If using this in constructor, in TS, an existing field is needed
  // Shorthand version
  constructor(protected readonly id: number, public name: string, protected employees: string[] = []) {}

  // To avoid this violations, we can be specific about what this is in TS
  describe(this: Department) {
    console.log(`Department: (${this.id}, ${this.name})`)
  }

  addEmployee(employee:string) {
    // Nope, readonly
    // this.id = 2;
    this.employees.push(employee);
  }

  printInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  private lastReport: string;
  private admins: string[];
  public static readonly currentBugs: number = 99;

  constructor(id: number, admins: string[], reports: string[]) {
    super(id, "IT");
    this.admins = admins;
    this.lastReport = reports[0];
  }

  public get getAdmins() {
    return this.admins;
  }

  public set setAdmin(admin: string) {
    if(admin !== "Dave") {
      this.admins.push(admin)
    }
    else {
      throw new Error("Dave is not a good admin candidate");
    }
  }

  addEmployee(name: string) {
    if(name === "Dave") {
      return;
    }
    else {
      this.employees.push(name);
    }
  }

  viewReport() {
    console.log(this.lastReport);
  }
}

const acc = new Department(1,  "Accounting");
acc.describe();
const IT = new ITDepartment(2, ["Farrel"], ['Bug reclassified as feature'])
console.log(IT.getAdmins);
IT.setAdmin = 'Dave';

// Static

console.log(ITDepartment.currentBugs);

// Private access errors:
// console.log(acc.id)

// const accCopy = { describe: acc.describe};
// accCopy.describe(); // undefined this pointer; accCopy doesn't have a name property
// This works, providing name:
// const accCopyValid = { name:"x", describe: acc.describe};
// accCopyValid.describe();


/* Abstract classes */

abstract class Animal {

  abstract emitNoise(): void;
  abstract describe(): void;
  abstract attack(): void;
}

/* Private constructors - singleton */

class AccountingDepartment extends Department {
  private lastReport: string;
  // Only allowed one instance
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  private constructor(id: number, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment(3, []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}
