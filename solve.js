const fs = require('fs');
const { join } = require('path');

const args = process.argv.slice(2);
const day = args[0];
const part = args[1] || '1';
const inputFile = join('./', day, !!args[2] ? 'test.txt' : 'input.txt');

console.log(`Day ${day}, part ${part}${inputFile === 'test.txt' ? ' (test data)' : ''}:`);

let solver;
let input;

try {
    solver = require(`./${day}`)[`part${part}`];
}
catch(e) {
    console.error(`Solver not found`);
    process.exit(1);
}

try {
    input = fs.readFileSync(inputFile).toString().split('\n');
    // remove last empty line
    if (!input[input.length-1]) {
        input.pop();
    }

}
catch(e) {
    console.error(`Input file not found: ${inputFile}`);
    process.exit(1);
}

const result = solver(input);
console.log(result);

