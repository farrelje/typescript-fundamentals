/* Interfaces and custom types */
// - Types are a bit looser (e.g. unions)
// - Interfaces are mainly used to define classes/objects
// - Both can be implemented (as a contract for design)
// - Interfaces help us with autocompletion and requirements
// - Interfaces can also extend each other


interface Named {
  readonly firstname: string;
  // Optional
  middlename?: string;
}

interface IPerson extends Named {
  greet(phrase: string): void;
}

class Person implements IPerson {

  constructor(public firstname: string, public age: number, public optionalThing?: string) {}
  
  greet(phrase: string){
    console.log(`Hi, I\'m ${this.firstname} and I say ${phrase}`);
  }
}

const p1 = new Person("Gary", 28);
p1.greet('cats');

// Type & function interfaces
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
} 

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2;


