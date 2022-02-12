/* https://adventofcode.com/2021/day/8 */

const { ReadFilesUtils, Common } = require('../utils/utils.js');
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

const inputs = new ReadFilesUtils(__dirname).inputAsStrings;
const UNIQUE_VALS = [ 2, 4, 3, 7 ];
const getUniqueNums = (texts) => {
    const outputValues = [].concat(...texts.map(str => str.split("|")[1].trim().split(" ")));
    const onlyUniqueNums = outputValues.filter(str => UNIQUE_VALS.includes(str.length));
    return onlyUniqueNums.length;
}


 const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 const ALL_SEGMENTS = [ SEGMENT_0, SEGMENT_1, SEGMENT_2, SEGMENT_3, SEGMENT_4, SEGMENT_5, SEGMENT_6, SEGMENT_7, SEGMENT_8, SEGMENT_9 ];

 const deduceNumbers = (texts) => {
    // count all instances in array that the letter is used
    const countLetterFrequencyInDigits = (segments) => {
        // init score map
        const counterArray = LETTERS.map(l => [l, 0]);
        const letterScoreMap = new Map([...counterArray]);
        
        LETTERS.forEach(letter => {
            segments.forEach(segment => {
                if (segment.indexOf(letter) !== -1) {
                    letterScoreMap.set(letter, letterScoreMap.get(letter) + 1);
                }
            });
        });

        return letterScoreMap;
    };

    // calculate sum according to the occurnces in segments
    const countSumByLetterFrequency = (letterFrequencyMap, _segments) => {

        const initDigitsArray = [...Array(_segments.length)].map( (_, i) => [i, 0]);
        const digitsScores = new Map([...initDigitsArray]);

        _segments.forEach((seg,i) => {
            LETTERS.forEach(letter => {
                if (seg.indexOf(letter) !== -1) {
                    digitsScores.set(i, digitsScores.get(i) + letterFrequencyMap.get(letter));
                }
            });
        });

        return digitsScores;
    };
    
    const allDigitsScore = countSumByLetterFrequency(countLetterFrequencyInDigits(ALL_SEGMENTS), ALL_SEGMENTS);
    const scoreToDigitMap = new Map(Array.from(allDigitsScore, a => a.reverse()));
    
    const decipheredNums = texts.map((input) => {
        const [digits, output] = input.split("|");
    
        const digitScore = countSumByLetterFrequency(countLetterFrequencyInDigits(digits.split(" ")), output.split(" "));
        return Number(Array.from(digitScore.values()).map(num => scoreToDigitMap.get(num)).join(""));
    });
    
    return Common.sumReduce(decipheredNums);
 }
 console.log(`number of unique numbers ${getUniqueNums(inputs)}`);
 console.log(`sum of all deciphered numbers ${deduceNumbers(inputs)}`);
 