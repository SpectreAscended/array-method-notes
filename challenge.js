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

const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const correctedJulia = julia1.slice(1, -1);
const bothArrays = correctedJulia.concat(kate1);
console.log(bothArrays);

function checkDogs(dogs) {
  dogs.forEach((dogAge, i) => {
    dogAge >= 5
      ? console.log(
          `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
        )
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });
}

checkDogs(bothArrays);
