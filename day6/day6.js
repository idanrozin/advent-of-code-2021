/* https://adventofcode.com/2021/day/6 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).rawInput.split(",").map(Number);

const countFish = (inputs) => {
    const countZeros = (numArr) => numArr.filter(n => n === 0).length;
    const decreaseNums = (numArr) => numArr.map(n => --n);
    const replaceZeros = (numArr) => numArr.map(n => n === -1 ? 6 : n);

    for (let i = 0; i < 80; i++) {
        const zeros = countZeros(inputs);
        inputs = decreaseNums(inputs);
        inputs = replaceZeros(inputs);
        inputs = [...inputs, ...Array(zeros).fill(8)];
    }
    return inputs;
}


console.log(countFish(inputs).length);