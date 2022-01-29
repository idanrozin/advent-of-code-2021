/* https://adventofcode.com/2021/day/7 */

const { ReadFilesUtils } = require('../utils/utils.js');

const numbers = new ReadFilesUtils(__dirname).inputAsNumbers

const calLeastFuelMoves = (numbers) => {
    const numbersSet = [...new Set(numbers)];
    const fuelSum = numbersSet.map(num => numbers.reduce((acc, curr) => acc + Math.abs(curr - num), 0));
    return Math.min(...fuelSum);
}

console.log(`Least Fuel Moves: ${calLeastFuelMoves(numbers)}`);


