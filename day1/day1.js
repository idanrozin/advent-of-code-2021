/* https://adventofcode.com/2021/day/1 */

const { ReadFilesUtils, Common } = require('../utils/utils.js');

const nums = new ReadFilesUtils(__dirname).inputAsNumbers;

const countIncreases = (numbers) => {
    let count = 0;

    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < numbers[i + 1]) {
             count++;
        }
    }

    return count;
}


// get all sums of three consecutive elements
const sumThrees = (numbers) => {
    const threesSumArray = [];

    for (let i = 0; i < numbers.length - 2; i++) {
        const subArray = numbers.slice(i, i + 3);
        threesSumArray.push(Common.sumReduce(subArray));
    }

    return threesSumArray;
}


console.log('increases', countIncreases(nums));
console.log('threes increases', countIncreases(sumThrees(nums)));
