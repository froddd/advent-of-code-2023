const fs = require("fs");
const { join } = require("path");

const args = process.argv.slice(2);
const day = args[0];
const part = args[1] || "1";
const inputFile = join("./", day, args[2] ? args[2] : "input");

console.log(
  `Day ${day}, part ${part}${args[2] ? ` (test data from ${args[2]})` : ""}:`,
);

let solver;
let input;

try {
  solver = require(`./${day}`)[`part${part}`];
} catch (e) {
  console.error(`Solver not found`);
  process.exit(1);
}

try {
  input = fs.readFileSync(inputFile).toString().split("\n");
  // remove last empty line
  if (!input[input.length - 1]) {
    input.pop();
  }
} catch (e) {
  console.error(`Input file not found: ${inputFile}`);
  process.exit(1);
}

console.time("Time to solve");
const result = solver(input);
console.log(result);
console.timeEnd("Time to solve");
