/* https://adventofcode.com/2021/day/5 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname).inputAsStrings;

const arrangeLinesData = (inputs) => {
    const allLines = {}
    inputs.forEach((el, i) => {
        const points = el.replace('->',',').split(',').map(Number)
            allLines[i] = {
            x1: Number(points[0]),
            y1: Number(points[1]),
            x2: Number(points[2]),
            y2: Number(points[3]),
        };
    });
    return allLines;
}

const getLines = (inputs) => {
    const allLines = arrangeLinesData(inputs);
    const onlyHorizontalAndVerticalLines = Object.values(allLines).filter(({ x1, x2, y1, y2 }) => x1 === x2 || y1 === y2);
    const linesMap = new Map();
    
    for (const line of onlyHorizontalAndVerticalLines) {
        const { x1, x2, y1, y2 } = line;
        
        let num = x1 === x2 ? Math.min(y1, y2) : Math.min(x1, x2);
        const target = x1 === x2 ? Math.max(y1, y2) : Math.max(x1, x2);
        while (num <= target) {
            const pointKey = x1 === x2 ? `${x1}-${num}` : `${num}-${y1}`;
            if (linesMap.has(pointKey)) {
                linesMap.set(pointKey, linesMap.get(pointKey) + 1);
            } else {
                linesMap.set(pointKey, 1);
            }
            num++;
        }
    }
    
    return Array.from(linesMap.values()).filter(n => n > 1);
}

console.log(`overlapping lines: ${getLines(inputs).length}`)