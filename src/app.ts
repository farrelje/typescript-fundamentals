// Built-in generics
const names: Array<string> = ["Farrel", "Gary"];
// const p: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Done");
//   }, 2000)
// })

// p.then( data => {
//   console.log(data.split(""));
// })

// Custom generics

// Generics show that these objects will be of different types, unlike object
// Used for when you don't care about anything other than that they will definitely be different
// TypeScript is good at inferring the types this way
// To constrain the types further, use extends
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: "Farrel"}, {age: "unknown"});
console.log(mergedObj.name);


// Let's make it more versatile: don't care much about what comes in, but it must have a length property
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let desc = "No value.";
  if(element.length > 0) {
    desc = `Length: ${element.length}`;
  }
  return [element, desc];
}

console.log(countAndDescribe(["Hi there!", "Cats", "Bananas"]));

// Dependency generic: T is object type, and U is some sort of key from T
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}
// Error - it's not a keyof
// extractAndConvert({banana: "Farrel"}, "name");
extractAndConvert({name: "Farrel"}, "name");

// Generic storage class
// Rather than having to create multiple versions or unions
// we can dynamically create different versions to be resolved later
// This gives us massive flexibility and type safety

type Primitive = string | number | boolean;
class DataStorage<T extends Primitive> {
  private data: T[] = [];

  addItem(item: T) {
    return [...this.data, item];
  }
  removeItem(item: T) {
    return this.data.filter(i => i !== item);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Cats");
// Nope:
//textStorage.addItem(2);
const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);

// However, falls apart a bit here, as functions are set up for primitives and primitive comparisons
// Hence, we extend primitives to avoid this issue
// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: "Farrel"});

// More built-ins
interface CourseGoal {
  title: string;
  description: string;
  dueDate: Date;
}

function createCourseGoal(title: string, description: string, dueDate: Date): CourseGoal {
  // Partial allows temporary optionally, e.g. here where building an object
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.dueDate = dueDate;
  return courseGoal as CourseGoal;
}

const names2: Readonly<string[]> = ["Dave", "Gavin"];
// Now this won't work
// names2.push("Cat");

// Summary: generics vs unions
// - Unions: (string | number | boolean) [] would mean a MIXED array of any of these types, which isn't great
//  ANY of these types are accepted
// - Generics: T extends string | number | boolean
//  This means, however, that you can only choose ONE in each instance, which is much better