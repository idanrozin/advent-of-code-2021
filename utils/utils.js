const fs = require('fs');
const path = require('path')

class ReadFilesUtils {
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
        const _rawInput = this._readInput()
        if (_rawInput.includes(',')) {
            return _rawInput.split(",")
        } else {
            return _rawInput.trim().replace(/\n$/, "").split(/\r?\n/);
        }
    }

    get inputAsNumbers () {
        return this.inputAsStrings.map(Number);
    }
}

class Common {
    static sum (previousValue, currentValue) { 
        return previousValue + currentValue; 
    }
    
    static sumReduce (array) { 
        return array.reduce(Common.sum, 0);
    };
}

module.exports =  {
    ReadFilesUtils,
    Common
}