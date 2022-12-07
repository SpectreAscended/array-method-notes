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

function calcAverageHumanAge(ages) {
  const humanAges = ages.map(dogAge => {
    if (dogAge > 2) return 16 + dogAge * 4;
    else return 2 * dogAge;
  });

  const adultDogs = humanAges.filter(age => age >= 18);

  //   const average =
  //     adultDogs.reduce((acc, age, i, arr) => {
  //       return acc + age;
  //     }, 0) / adultDogs.length;
  const average = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  console.log(humanAges);
  console.log(adultDogs);
  console.log(average);
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
