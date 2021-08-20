// Decorators

// function Logger(constructor: Function) {
//   console.log("Logging...")
//   console.log(constructor);
// }

// Decorator factory for more flexibility
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {

  // These changes allow the decorator to be used on an instatiated class 
  // (not hugely useful and very complicated, but interesting)
  return function<T extends {new(...args: any[]): { name: string} }>(originalConstructor: T) {

    // return and change a class
    return class extends originalConstructor {
      // skip allowed in TS - _
      constructor(..._: any[]){
        super();
        console.log('Rendering template')
        const hookEl = document.getElementById(hookId);
        if(hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
}

// Execution is bottom-up: closest to class first
@Logger("Logging person")
@WithTemplate("<h1>My person object</h1>", "app")
class Person {
  name = "Farrel";

  constructor(){
    console.log("Creating...")
  }
}

const pers = new Person();
console.log(pers);

/*
  Property descriptors: vanilla JS
  - tell you meta-info about the property, such as whether enumerable
*/


// Property decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

// Accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target, name, descriptor);
} 

// Method decorator - can return descriptors here
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
  console.log("Method decorator");
  console.log(target, name, descriptor);
}

// Parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target, name, position);
}
class Product {
  @Log
  title: string;
  private _price: number;
  
  @Log2
  set price(val: number) {
    if(val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - must be positive.');
    }
    
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1+tax);
  }
}

// Decorators will not be run multiple times - only when set up/defined
const p1 = new Product("Book", 21);
const p2 = new Product("Book", 25);

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // This will be triggered by the concrete object
      // Will no longer be overwritten by the event listener
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}
class Printer {
  message = "This works";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector('button')!;
// Common issue: binding. Pointer to this won't be printer, so have to manually bind
// button.addEventListener("click", printer.showMessage.bind(printer));

// In this example, we fix the undefined issue with autobind, which returns a property descriptor
button.addEventListener("click", printer.showMessage);


// Validation decorators

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive'] etc.
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  // Register class name as key
  registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) {
    // valid
    return true;
  }
  let isValid = true;
  // Loop over keys
  for(const prop in objValidatorConfig) {
    // values
    for(const validator of objValidatorConfig[prop]) {
      switch(validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener("submit", e => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if(!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
})

// Great package: https://www.npmjs.com/package/class-validator