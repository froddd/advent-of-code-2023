const getStart = (input) => {
  const startLine = input.find((line) => line.includes("S"));
  return [startLine.indexOf("S"), input.indexOf(startLine)];
};

const part1 = (input, steps = 64, wrap = false) => {
  const start = getStart(input);

  let reached = new Set([start.join(",")]);
  const cardinals = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  console.log(`Checking for ${steps} steps...`);

  for (let i = 1; i <= steps; i++) {
    let checkNext = [...reached.values()].map((x) => x.split(",").map(Number));
    reached = new Set();
    while (checkNext.length > 0) {
      const current = checkNext.shift();
      for (const cardinal of cardinals) {
        const dest = [current[0] + cardinal[0], current[1] + cardinal[1]];
        const destStr = dest.join(",");
        if (!wrap) {
          if (
            dest[0] < 0 ||
            dest[1] < 0 ||
            dest[0] >= input[0].length ||
            dest[1] >= input.length
          ) {
            continue;
          }
        }

        let destY = dest[1] % input.length;
        let destX = dest[0] % input[0].length;
        if (destY < 0) destY += input.length;
        if (destX < 0) destX += input[0].length;

        if (input[destY][destX] !== "#") {
          reached.add(destStr);
        }
      }
    }
  }

  return reached.size;
};

// Shamelessly ripped from other much better and helpful coding elves ;)
const f = (n, values) => {
  const b0 = values[0];
  const b1 = values[1] - values[0];
  const b2 = values[2] - values[1];
  return b0 + b1 * n + Math.floor((n * (n - 1)) / 2) * (b2 - b1);
};

const part2 = (input) => {
  const steps = 26_501_365;
  const offset = steps % input.length;
  const values = [
    part1(input, offset, true),
    part1(input, offset + input.length, true),
    part1(input, offset + input.length * 2, true),
  ];
  return f(Math.floor(26_501_365 / input.length), values);
};

module.exports = {
  part1,
  part2,
};
