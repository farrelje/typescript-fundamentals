type Admin = {
  name: string;
  privileges: string[];
}

type User = {
  name: string;
  startDate: Date;
}

// Intersection types
// Simpler than using interfaces for this reason
type SuperUser = Admin & User;

const u1: SuperUser = {
  name: "Bastian",
  privileges: ['read-write'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type NullableNumber = number | null;
type Universal = Combinable & Numeric;

// Type guards

type UnknownUser = User | Admin;

function printUserInfo(user: UnknownUser) {
  // Check for properties in object
  if('privileges' in user) {
    console.log(`Name: ${user.name}; ${user.privileges}`)
  }
  if('startDate' in user) {
    console.log(`Name: ${user.name}; ${user.startDate}`)
  }
}

printUserInfo(u1);

type Vehicle = Car | Truck;
class Car  {
  drive() {
    console.log("Driving");
  }
}

class Truck  {
  drive() {
    console.log("Driving");
  }
  loadCargo() {
    console.log("Loading cargo");
  }
}

const car = new Car();
const v2 = new Truck();

// Instanceof great with classes
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if(vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}

// Discriminated unions
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

// Can't use instanceof with interfaces
function moveAnimal(animal: Animal) {
  let speed: number;
  switch(animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at: " + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 20});

// Type casting
// Either/or
// const input = <HTMLInputElement>document.getElementById('userInput')!;
const input = document.getElementById('userInput')! as HTMLInputElement;

input.value = "Hi there!";

// Index properties - don't know exact key:value name, but can map string to string
// Useful for error handling or dynamic general type
// Cannot use id as number below
interface ErrorContainer {
  // index type
  [key: string]: string
}

const errorBag: ErrorContainer = {
  "email": "Not a valid email.",
  "username": "Must be between 2 an 50 characters."
}

// Function overloads
function add(a: string, b: string): string
function add(a: number, b: string): number
function add(a: number, b: number): number
function add(a: Combinable, b: Combinable) {
  if(typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString()
  }
  return a + b;
}

// Optional chaining

const fetchedData = {
  id: "1",
  name: "Farrel",
  job: {title: "CEO", description: "Company X"}
}

console.log(fetchedData?.job?.title);
