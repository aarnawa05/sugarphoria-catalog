// console.log("Welcome to Sugarphoria Catalog!");
// console.error('Error: You done just messed up!');
// console.warn('Warning: This is a warning message!');

/** var -- global scoped, don't used much anymore, 
    let - reassign values, const - value is constant -- block scoped level */

const name = "Nawa";
let age = 25;

const item = {
    name: 'Mars Bar',
    type: 'Candy',
    location: ["Denver", "Dallas"],
    available: true,
}

const todoJSON = JSON.stringify (item);
console.log(item);
console.log(Object.keys(item));

// forEach, map, filter

const array = [5, 10, 'hello', 20, 15];
const filteredArray = array.filter(function(item) {return typeof item === 'number'})
                            .map(function(item) {return item * 20});

console.log(filteredArray);

