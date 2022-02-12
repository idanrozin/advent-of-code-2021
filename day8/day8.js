/* https://adventofcode.com/2021/day/8 */

const { ReadFilesUtils } = require('../utils/utils.js');

const txt = new ReadFilesUtils(__dirname).inputAsStrings;
const UNIQUE_VALS = [ 2, 4, 3, 7 ];
const getUniqueNums = (texts) => {
    const outputValues = [].concat(...texts.map(str => str.split("|")[1].trim().split(" ")));
    const onlyUniqueNums = outputValues.filter(str => UNIQUE_VALS.includes(str.length));
    return onlyUniqueNums.length;
}
console.log(`number of unique numbers ${getUniqueNums(txt)}`);