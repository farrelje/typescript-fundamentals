function add(n1, n2) {
    return n1 + n2;
}
// *Basic types*
var number1 = 5;
var number2 = 1.3;
var inferredNum = 5.7;
var stringNum = '1.4';
var result = add(number1, number2);
// TS to the rescue
// const result = add(number1, stringNum);
// console.log(result);
// *Objects*
// Inline object typing
var person = {
    name: 'Farrel',
    location: 'unknown'
};
console.log(person.name);
