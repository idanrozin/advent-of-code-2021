/* https://adventofcode.com/2021/day/3 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).inputAsStrings;

const calcGammaAndEpsilon = (binArr) => {
    
/* HELPER METHODS */

    const computeBinary = (inp) => parseInt(typeof inp === "string" ? inp : inp.join(""), 2);
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

const { gammaRate, epsilonRate } = calcGammaAndEpsilon(inputs);
console.log(`he power consumption of the submarine is: ${gammaRate * epsilonRate}`);