/* https://adventofcode.com/2021/day/8 */

const { ReadFilesUtils } = require('../utils/utils.js');
const {
    SEGMENT_0,
    SEGMENT_1,
    SEGMENT_2,
    SEGMENT_3,
    SEGMENT_4,
    SEGMENT_5,
    SEGMENT_6,
    SEGMENT_7,
    SEGMENT_8,
    SEGMENT_9,
} = require('./segments');

const txt = new ReadFilesUtils(__dirname).inputAsStrings;
const UNIQUE_VALS = [ 2, 4, 3, 7 ];
const getUniqueNums = (texts) => {
    const outputValues = [].concat(...texts.map(str => str.split("|")[1].trim().split(" ")));
    const onlyUniqueNums = outputValues.filter(str => UNIQUE_VALS.includes(str.length));
    return onlyUniqueNums.length;
}
// console.log(`number of unique numbers ${getUniqueNums(txt)}`);
/*
 console.log(SEGMENT_0);
 console.log(SEGMENT_1);
 console.log(SEGMENT_2);
 console.log(SEGMENT_3);
 console.log(SEGMENT_4);
 console.log(SEGMENT_5);
 console.log(SEGMENT_6);
 console.log(SEGMENT_7);
 console.log(SEGMENT_8);
 console.log(SEGMENT_9); 
 */

 const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 const ALL_SEGMENTS = [ SEGMENT_0, SEGMENT_1, SEGMENT_2, SEGMENT_3, SEGMENT_4, SEGMENT_5, SEGMENT_6, SEGMENT_7, SEGMENT_8, SEGMENT_9 ];
//  console.log(ALL_SEGMENTS[0].indexOf('d'));
 const deduceNumbers = (texts) => {
    // count letter frequency in all digits
    const counterArray = LETTERS.map( (l) => [l, 0]);
    const letterScoreMap = new Map([...counterArray]);
    const countLetterFrequencyInDigits = () => {
        LETTERS.forEach(letter => {
            ALL_SEGMENTS.forEach(segment => {
                if (segment.indexOf(letter) !== -1) {
                    letterScoreMap.set(letter, letterScoreMap.get(letter) + 1);
                }
            });
        });
    }
    countLetterFrequencyInDigits();
    console.log(letterScoreMap);
 }
 deduceNumbers()
 