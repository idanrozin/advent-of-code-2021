/* https://adventofcode.com/2021/day/7 */

const { ReadFilesUtils } = require('../utils/utils.js');

const numbers = new ReadFilesUtils(__dirname).inputAsNumbers

const calLeastFuelMoves = (numbers,calcFunction) => {
    const numbersSet = [...new Set(numbers)];
    const fuelSum = numbersSet.map(calcFunction);
    return Math.min(...fuelSum);
};


const countOneEnergyUnitPerStep = (num) => numbers.reduce((acc, curr) => acc + Math.abs(curr - num), 0);
const countSteps = (n) => (n * (n + 1)) / 2;
const countAscendingEnergyUnitPerStep = (num) => numbers.reduce((acc, curr) => acc + countSteps(Math.abs(curr - num)), 0);

console.log(`Least Fuel Moves when each step is 1 energy unit: ${calLeastFuelMoves(numbers,countOneEnergyUnitPerStep )}`);
console.log(`Least Fuel Moves when each step energy unit increased by 1 from previous step: ${calLeastFuelMoves(numbers, countAscendingEnergyUnitPerStep)}`);