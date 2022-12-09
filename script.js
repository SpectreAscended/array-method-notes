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

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
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

function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

function calcDisplaySummary(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
}

function createUsenames(accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}

createUsenames(accounts);

function updateUI(acc) {
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log('LOGIN');
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Clear input fields
    // inputLoginUsername.value = '';
    // inputLoginPin.value = '';
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  // Clear input field
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  console.log();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

////////////////////////////////////////////////////////
// Data Transformations, Map, Filter, Reduce
////////////////////////////////////////////////////////

// Map returns a New Array containing the results of applying an operation on all original elements

// Filter returns a New Array containing the array elements that passed a specified test condition

// Reduce boils ("reduces") all array elements down to one single value (eg. adding all elements together)

/////////////////////////////////////////////////////
// Map
/////////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'desposited' : 'withdrew'} $${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

/////////////////////////////////////////////////////////
// Filter
/////////////////////////////////////////////////////////

// const deposits = movements.filter((mov, i, arr) => {
//   return mov > 0;
// });

// const withdrawals = movements.filter(mov => mov < 0);

// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);

/////////////////////////////////////////////////////////
// Reduce
/////////////////////////////////////////////////////////

// 0 at the end is the INITIAL value of the accumulator

// const balance = movements.reduce((accumulator, current, i, arr) => {
//   console.log(
//     `Iteration number ${
//       i + 1
//     }. Current value: $${current}. Previous total: $${accumulator}`
//   );
//   return accumulator + current;
// }, 0);

// Above function written cleaner

// const balance = movements.reduce((acc, cur) => acc + cur, 0);

// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Maximum value
// Your starting point should always be the first value of the array if you are trying to find a maximum or minimum value.  Don't just put it as 0.

// const maxValue = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(maxValue);

/////////////////////////////////////////////////////////
// Chaining methods
/////////////////////////////////////////////////////////
const eurToUsd = 1.1;

// All of these methods return an array (Except reduce. Reduce returns a single value), so we can keep chaining methods onto it to manipulate the arrays

// For debugging we can access the current array in the NEXT method to see what's going on

// Chaining methods can have in impact on performance, so try to do as little as possible.

// It is BAD practice to chain methods that mutate the original array, such as Splice method.

// PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * eurToUsd)
//   .map((mov, _, arr) => {
//     console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

///////////////////////////////////////////////////////
// Find
///////////////////////////////////////////////////////

// Find will NOT return an array, instead it will only return the FIRST element that meets this condition.  In otherwords, it will return the first element in the array in which our mov < 0 statement becomes 'true'.

// Similar to filter, except filter will return an array with all elements that meet this statement, instead of just the first one.

// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// console.log(account);

// let accountsFor;

// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') accountsFor = account;
// }

// console.log(accountsFor);

//////////////////////////////////////////////////////
// Find Index
//////////////////////////////////////////////////////

// accounts.findIndex((acc, array) => acc.username === currentAccount.username) {...}

// Similar to find, but it returns the index in the array that its in.

// Similar to indexOf, except we need to pass in a callback function

// with findIndex we can use a complex condition to find the element we are looking for.

// You get access to the entire array in findIndex, but there is very little use case for that.

////////////////////////////////////////////////////////
// Some - method
////////////////////////////////////////////////////////

// console.log(movements);

// // EQUALITY - Checks only for equality and returns a boolean
// console.log(movements.includes(-130)); // true

// // CONDITION - Checks a specified range and returns a boolean
// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// ////////////////////////////////////////////////////////
// // Every - method
// ////////////////////////////////////////////////////////

// // Similar to some, but EVERY element in our condition needs to be true.

// console.log(movements.every(mov => mov > 0)); // false
// console.log(account4.movements.every(mov => mov > 0)); //true, because in this array, all values are above 0.

// ////////////////////////////////////////////////////////
// // Separate callback
// ////////////////////////////////////////////////////////

// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

////////////////////////////////////////////////////////
// flat and flatMap methods
////////////////////////////////////////////////////////

// Removes nested arrays and puts them in a single array. Only goes one level deep, though by default.  We can specify how many levels deep we would like to go arr.flat(2) will go 2 levels deep

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);

// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance);

// const totalBalance = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalBalance);

// Flat map basically just combines map with flat methods.  Flat map ONLY goes one level deep.  You can't adjust it.

///////////////////////////////////////////////////////
// Sorting arrays
///////////////////////////////////////////////////////

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']  Sorts alphabetically. Mutates original array, so be careful with this method.

// console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70]
// Sort method sorts things by String, so that is why these numbers are not in the order you'd expect.
// We can fix this by adding a 'compare' function into the method

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// movements.sort((a, b) => a - b);

// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

// // console.log(movements.sort((a, b) => a - b)); //[-130, -400, -650, 1300, 200, 3000, 450, 70]

// // console.log(movements.sort((a, b) => b - a)); //[3000, 1300, 450, 200, 70, -130, -400, -650]

/////////////////////////////////////////////////////////
// Creating and filling arrays programatically
/////////////////////////////////////////////////////////

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty arrays + fill method
// const x = new Array(7);
// console.log(x); // [empty x 7] - This creates an array with 7 empty elements

// x.fill(1, 3, 5);

// console.log(x);
// arr.fill(23, 2, 6);

// console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

// // Array.from

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y); // [1, 1, 1, 1, 1, 1, 1]

// const z = Array.from({ length: 7 }, (_, i) => i + 1);

// console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// const randomArray = Array.from({ length: 100 }, (_, i) =>
//   Math.trunc(Math.random() * 6 + 1)
// );

// console.log(randomArray);

////////////////////////////////////////////////////////
// Convert node list to Array
////////////////////////////////////////////////////////

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );

  // console.log(movementsUI.map(el => +el.textContent.replace('€', '')));

  console.log(movementsUI); // [1300, 70, -130, -650, 3000, -400, 450, 200]

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});
