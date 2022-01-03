/* https://adventofcode.com/2021/day/4 */

const ReadFilesUtils = require('../utils/utils.js');
const inputs = new ReadFilesUtils(__dirname)._readInput();

const arrangeDataAsBoardsMatrix = (boards) => {
	
	return allBoards = boards.map(b => {
        return b.split('\n')
			.map(r => r.split(" ")
			.filter(c => c !== "")
			.map(t => 
            ({
                number: Number(t),
                marked: false
            })
        ));
    });
}

const getBingoScore = (inputs) => {

	const isWin = (board, line, colIndex) => {
		return line.every(n => n.marked) || board.every(ln => ln[colIndex].marked);
	};

	const sumAllUnmarked = (board) => board.map(b => b.reduce((acc,curr) => curr.marked ? acc : acc + curr.number , 0)).reduce((acc, curr) => acc + curr, 0);

    let [numbers, ...boards] = inputs.split(/\n\s*\n/);
    numbers = numbers.split(",").map(Number);
	const allBoards = arrangeDataAsBoardsMatrix(boards);
    
	for (const num of numbers) {

		for (const board of allBoards) {

			for (const line of board) {

				const index = line.findIndex(({ number, marked }) => num === number && !marked);
				
				if (index !== -1) {
					line[index].marked = true;
					
					if (isWin(board, line, index)) {
						const sum = sumAllUnmarked(board);
						return sum * num;
					}
				}
			}
		}
	}
}


console.log(`Bingo score: ${getBingoScore(inputs)}`);
