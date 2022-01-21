/* https://adventofcode.com/2021/day/5 */

const ReadFilesUtils = require('../utils/utils.js');

const inputs = new ReadFilesUtils(__dirname, ).inputAsStrings;
const filterLines = ({ x1, x2, y1, y2 }) => x1 === x2 || y1 === y2;
const filterMapEntries = (map, greaterThanNum) => Array.from(map.values()).filter(n => n > greaterThanNum);
const arrangeLinesData = (inputs) => {
    const allLines = {}
    inputs.forEach((el, i) => {
        const points = el.replace('->',',').split(',').map(Number)
            allLines[i] = {
            x1: points[0],
            y1: points[1],
            x2: points[2],
            y2: points[3],
        };
    });
    return allLines;
}

const getLines = (inputs) => {
    const allLines = arrangeLinesData(inputs);
    const onlyHorizontalAndVerticalLines = Object.values(allLines).filter(filterLines);
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
    
    return filterMapEntries(linesMap, 1);
}

const getDiagonalLines = (inputs) => {
    const allLines = arrangeLinesData(inputs);
    
    const onlyDiagonalLines = Object.values(allLines);

    const buildKey = (x, y) => `${x}-${y}`;

    const linesMap = new Map();

    const insertToMap = (key) => {
        if (linesMap.has(key)) {
            linesMap.set(key, linesMap.get(key) + 1);
        } else {
            linesMap.set(key, 1);
        }
    };
   
    for (const line of onlyDiagonalLines) {
        let { x1, x2, y1, y2 } = line;
        insertToMap(buildKey(x1, y1));

        if (x1 !== x2 && y1 !== y2) {
            while (x1 !== x2) {
                insertToMap(buildKey(
                    x1 < x2 ? ++x1: --x1, y1 < y2 ? ++y1: --y1
                ));            
            }
        } else if (x1 === x2) {            
            while (y1 !== y2) {
                insertToMap(buildKey(
                    x1, y1 < y2 ? ++y1: --y1
                ));            
            }
        } else if (y1 === y2) {
            while (x1 !== x2) {
                insertToMap(buildKey(
                    x1 < x2 ? ++x1: --x1, y1
                ));            
            }
        }
    }
    
    return filterMapEntries(linesMap, 1);
}

console.log(`overlapping lines: ${getLines(inputs).length}`)
console.log(`overlapping lines including diagonal: ${getDiagonalLines(inputs).length}`)