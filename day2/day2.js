/* https://adventofcode.com/2021/day/2 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).inputAsStrings;

const UP_DOWN_REGEX = new RegExp("(up|down)\\s*(\\d+)");
const FORWARD_REGEX = new RegExp("forward\\s*(\\d+)");
const calcHorizontalPosAndDepth = (inputs) => {
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
};

const calcHorizontalPosAndDepthWithAim = (inputs) => {
    let aim = 0, forwardPos = 0 , depthPos = 0;
    
    inputs.forEach(el => {
        const forward = el.match(FORWARD_REGEX);
        if (forward) {

            let [ , value ] = forward;
            value = Number(value);
            depthPos += value * aim;
            forwardPos += value;

        } else {
        
            const upDown = el.match(UP_DOWN_REGEX);
            let [ , upOrDown, value ] = upDown;
            value = Number(value);
        
            const operate = upOrDown === "up" ? -Math.abs(value) : value;
            aim += operate;

        }   
    });

   
    return {
        forwardPos,
        depthPos
    };

};

const { forwardSum, upDownSum } = calcHorizontalPosAndDepth(inputs);
console.log(`Product of horizontal position and depth: ${upDownSum * forwardSum}`);

const { forwardPos, depthPos } = calcHorizontalPosAndDepthWithAim(inputs);
console.log(`Product of horizontal position and depth with aim: ${forwardPos * depthPos}`);