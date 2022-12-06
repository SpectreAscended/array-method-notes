'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displayMovements(movements) {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

/////////////////////////////////////////////////
// Slice - Does not mutate original array
/////////////////////////////////////////////////
// Slice takes what you want from an array and returns a new array.  arr.slice(start, end).  Will start on the first number and end on the number BEFORE the last number. So arr.slice(2, 4) will include c and d.  If an end number isnt specified it will just return the remaining elements of the array. We can start at the beginning, or at the end(using -1, -2 etc).

// We can create a Shallow copy of an array by just calling arr.slice() with no arguments.

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2)); // ['c', 'd', 'e']
// console.log(arr.slice(2, 4)); // ['c', 'd']
// console.log(arr.slice(-2)); // ['e', 'd']
// console.log(arr.slice(-1)); // ['e']
// console.log(arr.slice(1, -2)); // ['b', 'c'];
// console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']
// console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']

// ////////////////////////////////////////////////////////
// // Splice - Mutates original array
// ////////////////////////////////////////////////////////

// // console.log(arr.splice(2)); // ['c', 'd', 'e']
// // console.log(arr); // ['a', 'b']
// // arr.splice(-1); // Will delete the last element of an array. - or will return that value

// const arr2 = ['a', 'b', 'c', 'd', 'e'];
// // arr.splice(first element, number to delete - see below)
// const arr3 = arr2.splice(1, 3);
// console.log(arr2); // ['a', 'e']
// console.log(arr3); // ['b', 'c', 'd']

// ////////////////////////////////////////////////////////
// // Reverse - Mutates original array
// ////////////////////////////////////////////////////////
// const arrReverse = ['a', 'b', 'c', 'd', 'e'];
// console.log(arrReverse.reverse()); // ['e', 'd', 'c', 'b', 'a']

// ///////////////////////////////////////////////////////
// // Concat - Does not mutate the original arrays
// ///////////////////////////////////////////////////////

// const letters1 = ['a', 'b', 'c', 'd', 'e'];
// const letters2 = ['f', 'g', 'h', 'i', 'j'];

// const lettersConcat = letters1.concat(letters2);
// console.log(lettersConcat); // Adds the 2 arrays together
// const lettersSpread = [...letters1, ...letters2];
// console.log(lettersSpread); // Will achieve the same results, also does not mutate the original arrays

// ///////////////////////////////////////////////////////
// // Join
// ///////////////////////////////////////////////////////

// console.log(lettersConcat.join(' - ')); // a - b - c - d... so on.  Returns a string, not an array.

////////////////////////////////////////////////////////
// at Method - Also works with strings
////////////////////////////////////////////////////////

// const arr = [23, 11, 64];
// console.log(arr[0]); // 23
// console.log(arr.at(23)); // 23
// console.log(arr[arr.length - 1]); // 64
// console.log(arr.slice(-1)[0]); // 64
// console.log(arr.at(-1)); // 64
// console.log('cory'.at(0)); // c
// console.log('cory'.at(-1)); // y

////////////////////////////////////////////////////////
// forEach - Looping over arrays
////////////////////////////////////////////////////////

// forEach - You can't break out of a loop.  It will always loop over the entire array, so if you need to break out of a loop at some point it is better to use 'for of'

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited $${movement}`);
//   } else {
//     console.log(`You withdrew $${Math.abs(movement)}`);
//   }
// }
// console.log('---for of---');
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited $${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew $${Math.abs(movement)}`);
//   }
// }

// console.log('---forEach---');
// movements.forEach((movement, i, arr) => {
//   movement > 0
//     ? console.log(`Movement ${i + 1}: Deposit: $${movement}`)
//     : console.log(`Movement ${i + 1}: Withdrawal: $${Math.abs(movement)}`);
// });

////////////////////////////////////////////////////////
// forEach - Maps and Sets
////////////////////////////////////////////////////////

// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// });

// // Set
// // Sets don't have keys, or index's
// const currenciesUnique = new Set(['USD', 'CAD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach((value, _, set) => {
//   console.log(`${_}: ${value}`);
// });
