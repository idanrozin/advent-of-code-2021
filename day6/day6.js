/* https://adventofcode.com/2021/day/6 */

const { ReadFilesUtils, Common } = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).rawInput.split(",").map(Number);

const countLanternFish = (inputs) => {
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

const countLanternFishOptimized = (inputs) => {

    //init & fill map
    const counterArray = [...Array(9)].map( (_, i) => [i, 0]);
    let fishMap = new Map([...counterArray]);
    
    inputs.forEach(num => {
        fishMap.set(num, fishMap.get(num) + 1);
    });
    
    for (let i = 0; i < 256; i++) {
        const fishMapCopy = new Map(fishMap);
        // count zeros
        const zeros = fishMapCopy.get(0);
        for (let i = 0; i < 9; i++) {
            // decreaseNums
            fishMap.set(i, fishMapCopy.get(i + 1));

            if (i === 6) {
                // 6's is comprised of the 7's from prev iteration + the zeros from last iteration which will be now 6 
                fishMap.set(i, fishMapCopy.get(i + 1) + zeros);
            }
            if (i === 8) {
                // 0 from last iteration becomes 8
                fishMap.set(i, zeros);
            }
        }
    }

    return Common.sumReduce(Array.from(fishMap.values()));
}

console.log(`Lantern Fish count after 80 days: ${countLanternFish(inputs).length}`);
console.log(`Lantern Fish count after 256 days (with optimization for space and time): ${countLanternFishOptimized(inputs)}`);
