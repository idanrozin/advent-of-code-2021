const fs = require('fs');
const path = require('path')

module.exports = class ReadFilesUtils {
    constructor(dir, filename = 'input.txt') {
        this.filepath = path.join(dir, filename);
    }
    
    _readInput () {
        try {
            return fs.readFileSync(this.filepath, 'utf8');
        } catch (error) {
            throw error;
        }
    }
    
    get rawInput () {
        return this._readInput();
    }

    get inputAsStrings () {
        return this._readInput().trim().replace(/\n$/, "").split(/\r?\n/);
    }

    get inputAsNumbers () {
        return this.inputAsStrings.map(Number);
    }
}