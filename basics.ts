function add(n1: number, n2: number): number {
  return n1 + n2;
}

// *Basic types*
const number1: number = 5;
const number2: number = 1.3;
const inferredNum = 5.7;
const stringNum: string = '1.4';

const result = add(number1, number2);

// TS to the rescue
// const result = add(number1, stringNum);
// console.log(result);


// *Objects*

// Inline object typing
// + tuples
const person: {
  name: string;
  location: string;
  hobbies: string[];
  role: [number, string]; // caution: while more strict, will not protect against .push()

} = {
  name: 'Farrel',
  location: 'unknown',
  hobbies: ['Running', 'Ducks'],
  role: [1, 'Admin']
} 

// String methods will be autocompleted now
// for(const hobby of person.hobbies) {
//   console.log(hobby.toUpperCase());
// }

// *Enums* - easier mappings

enum Role {
  ADMIN,
  READ_WRITE,
  READ_ONLY
}

const person2: {
  name: string;
  location: string;
  hobbies: string[];
  role: Role
} = {
  name: 'Farrel',
  location: 'unknown',
  hobbies: ['Running', 'Ducks'],
  role: Role.ADMIN
} 

// Unions & literals 
function combine(
  a: number | string, 
  b: number | string, 
  resultConverion: 'asText' | 'asNumber' // literal allowing only two options
  ): number | string 
  {
  // if(resultConverion === 'asBanana') <= will fail due to literal
  let result;
  if(typeof a === "number" && typeof b === "number") {
    result = a + b;
  } else {
    result = a.toString() + b.toString();
  }
  return result;
}

// Type alias
type NumOrString = number | string;
type ResultOption = 'asText' | 'asNumber';

function aliases(
  a: NumOrString, 
  b: NumOrString, 
  resultConverion: ResultOption // literal allowing only two options
  ): NumOrString
  {
  // if(resultConverion === 'asBanana') <= will fail due to literal
  return 0;
}

// Function types & callbacks
let x : (a, b, c) => number | string;
x = aliases;
// invalid
// x = 5;
// x = add(5, 6);

function addAndHandle(a: number, b: number, cb: (num: number) => void): void {
  const result = a + b;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
  // Allowed because of void functionality
  return result;
})

// *Unknown & never*
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "Cats";
// Compared to any, which doesn't care, unknown doesn't allow specific coercion
// unless you check for it - so slightly better than any
// nope => userName = userInput;
// yep >
if (typeof userInput === "string") {
  userName = userInput;
}

// It NEVER returns something - can be good for clarity
// Infinite loop functions would also be never
function generateError(message: string, code: number): never {
  throw {message, code}
}

const res = generateError("Server error", 500);
console.log(res);
