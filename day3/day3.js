/* https://adventofcode.com/2021/day/3 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).inputAsStrings;

const computeBinary = (inp) => parseInt(typeof inp === "string" ? inp : inp.join(""), 2);
const calcGammaAndEpsilon = (binArr) => {
    
/* HELPER METHODS */

    
    const getComplementaryBinary = (array) => array.split("").map(n => n == "0" ? "1" : "0");

/* HELPER METHODS */

    const lineDigitsLength = binArr[0].length;
    let mostCommonBits = "";
    
    for (let i = 0; i < lineDigitsLength; i++) {
        
        let zerosCount = 0;
        let onesCount = 0;

        for (let j = 0; j < binArr.length; j++) {
            const num = binArr[j].substring(i, i + 1);
            num === "0" ? zerosCount++ : onesCount++
        }

        mostCommonBits += zerosCount > onesCount ? "0" : "1";
        
    }
        
    const gammaRate = computeBinary(mostCommonBits);
    const epsilonRate = computeBinary(getComplementaryBinary(mostCommonBits));

    return {
        gammaRate,
        epsilonRate
    };
};
const getLifeSupportRatingAttr = (binArr, getRate, equalCaseGetMostCommons) => {

    const lineDigitsLength = binArr[0].length;
    
    for (let i = 0; i < lineDigitsLength; i++) {
        
        if (binArr.length === 1) {
            break;
        }

        const zeros = [];
        const ones = [];
        for (let j = 0; j < binArr.length; j++) {
            const binNum = binArr[j];
            const num = binNum.substring(i, i + 1);
            num === "0" ? zeros.push(binNum) : ones.push(binNum);
        }

        if (zeros.length === ones.length) {
            binArr = equalCaseGetMostCommons ? ones : zeros;
            continue;
        }

        binArr = getRate(zeros, ones);
    }
  
    return computeBinary(binArr[0]);
};

const { gammaRate, epsilonRate } = calcGammaAndEpsilon(inputs);
console.log(`the power consumption of the submarine is: ${gammaRate * epsilonRate}`);

const oxygenGeneratorRating = getLifeSupportRatingAttr(inputs, (a, b) => a.length > b.length ? a : b, true);
const CO2ScrubberRating = getLifeSupportRatingAttr(inputs, (a, b) => a.length < b.length ? a : b, false);
console.log(`the life support rating of the submarine is: ${oxygenGeneratorRating * CO2ScrubberRating}`);