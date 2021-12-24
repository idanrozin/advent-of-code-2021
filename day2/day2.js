/* https://adventofcode.com/2021/day/2 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).inputAsStrings;

const calcHorizontalPosAndDepth = (inputs) => {
    const UP_DOWN_REGEX = new RegExp("(up|down)\\s*(\\d+)");
    const FORWARD_REGEX = new RegExp("forward\\s*(\\d+)");
    const findForwards = str => str.includes('forward');
    
    const justForwards = inputs.filter(findForwards);
    const upDowns = inputs.filter(str => !findForwards.call(null,str));

    const forwardSum = justForwards.reduce((acc, curr) => {
        const forward = curr.match(FORWARD_REGEX);   
        return acc += forward ? Number(forward[1]) : 0;
    }, 0);

    const upDownSum = upDowns.reduce((acc, curr) => {
        const upDown = curr.match(UP_DOWN_REGEX);
        const num = Number(upDown[2]);
        const operate = upDown[1] === "up" ? -Math.abs(num) : num;

        return acc += upDown ? operate : 0;
    }, 0);

    return {
        forwardSum, 
        upDownSum 
    };
}

const { forwardSum, upDownSum } = calcHorizontalPosAndDepth(inputs);
console.log(`Product of up-down and forward ${upDownSum * forwardSum}`);