'use strict';
/*
Challenge 1

1. Julia found out that the owners of the FIRST and LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]

TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK
*/

// const julia1 = [3, 5, 2, 12, 7];
// const kate1 = [4, 1, 15, 8, 3];

// const julia2 = [9, 16, 6, 8, 3];
// const kate2 = [10, 5, 6, 1, 4];

// const correctedJulia = julia1.slice(1, -2);
// const bothArrays = correctedJulia.concat(kate1);
// console.log(bothArrays);

// function checkDogs(dogs) {
//   dogs.forEach((dogAge, i) => {
//     dogAge >= 3
//       ? console.log(
//           `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
//         )
//       : console.log(`Dog number ${i + 1} is still a puppy`);
//   });
// }

// checkDogs(bothArrays);

// Instructor Solution ////////////////

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   console.log(dogsJuliaCorrected);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach((dog, i) => {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// };

// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/////////////////////////////////////////////////////////
// Challenge 2
/////////////////////////////////////////////////////////

/*
Let's go back to Julia and Kate's study about dogs.  This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an array of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are atleast 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK
*/

// function calcAverageHumanAge(ages) {
//   const humanAges = ages.map(dogAge => {
//     if (dogAge > 2) return 16 + dogAge * 4;
//     else return 2 * dogAge;
//   });

//   const adultDogs = humanAges.filter(age => age >= 18);

//   //   const average =
//   //     adultDogs.reduce((acc, age, i, arr) => {
//   //       return acc + age;
//   //     }, 0) / adultDogs.length;
//   const average = adultDogs.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   console.log(humanAges);
//   console.log(adultDogs);
//   console.log(average);
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//////////////////////////////////////////////////////////
// Challenge 3
//////////////////////////////////////////////////////////

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

// const calcAverageHumanAge = ages => {
//   const average = ages
//     .map(age => (age > 2 ? 16 + age * 4 : age * 2))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return average;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

/////////////////////////////////////////////////////////
// Challenge 4
/////////////////////////////////////////////////////////

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.  
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create an array, simply loop over the array.
Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose)

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle')

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions inside the array's object)

HINT1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them.

HINT2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/////////////////////////////////////////////////////////////////////////
// My Attempt
/////////////////////////////////////////////////////////////////////////

// // 1.
// dogs.forEach(
//   dog => (dog.reccomendedFood = Math.trunc(dog.weight ** 0.75 * 28))
// );

// console.log(dogs);

// // 2.

// const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));

// if (sarahsDog.reccomendedFood < sarahsDog.curFood) {
//   console.log("Sarah's dog is eating too much");
// } else {
//   console.log("Sarah's dog is eating too little");
// }

// // 3.

// const eatsTooLittle = [];
// const eatsTooMuch = [];

// dogs.filter(dog =>
//   dog.curFood > dog.reccomendedFood
//     ? eatsTooMuch.push(dog)
//     : eatsTooLittle.push(dog)
// );

// // 4.

// // eatsTooLittle.forEach(dog =>
// //   console.log(`${dog.owners.join(' and ')}'s dogs eat too much`)
// // );

// console.log(
//   `${eatsTooLittle
//     .flatMap(dog => dog.owners)
//     .join(' and ')}'s dogs eat too little`
// );

// console.log(
//   `${eatsTooMuch.flatMap(dog => dog.owners).join(' and ')}'s dogs eat too much`
// );

// // 5.
// console.log(dogs.some(dog => dog.reccomendedFood === dog.curFood));

// // 6.

// const okayAmount = dogs.some(
//   dog =>
//     dog.curFood > dog.reccomendedFood * 0.9 &&
//     dog.curFood < dog.reccomendedFood * 1.1
// );

// const foodCheck = function (dog) {
//   console.log(dog);
//   return (
//     dog.curFood > dog.reccomendedFood * 0.9 &&
//     dog.curFood < dog.reccomendedFood * 1.1
//   );
// };

// console.log(okayAmount);
// // console.log(dogs.forEach(dog => foodCheck(dog)));

// // 7.
// // const okayAmountArr = dogs.filter(dog => okayAmount);
// // console.log(okayAmountArr);

// // const healthyAmount = dogs.filter(dog => {
// //   return (
// //     dog.curFood > dog.reccomendedFood * 0.9 &&
// //     dog.curFood < dog.reccomendedFood * 1.1
// //   );
// // });

// const healthyAmount = dogs.filter(foodCheck, dogs);

// console.log(healthyAmount);

// // 8.

// console.log(dogs.flatMap(dogs => dogs.reccomendedFood).sort((a, b) => a - b));

/////////////////////////////////////////////////////////////////////////
// Instructor solution
/////////////////////////////////////////////////////////////////////////

// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(dogSarah);

console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

// 4.

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );
console.log(dogs.some(checkEatingOkay));

// 7.

const okAmount = dogs.filter(checkEatingOkay);

console.log(okAmount);

// 8.
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsSorted);
