const ReadFilesUtils = require('../utils/utils.js');

const nums = new ReadFilesUtils(__dirname).inputAsNumbers;

const countIncreases = () => {
    let count = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < nums[i + 1]) {
             count++;
        }
    }

    return count;
}

console.log('increases', countIncreases());