const part1 = (input) => {
  // Find the start
  const startLine = input.find((line) => line.includes("S"));
  const start = [startLine.indexOf("S"), input.indexOf(startLine)];

  const steps = process.argv.slice().includes("test") ? 6 : 64;
  let reached = [start.join(",")];
  const cardinals = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  for (let i = 1; i <= steps; i++) {
    let checkNext = reached.slice().map((x) => x.split(",").map(Number));
    reached = [];
    while (checkNext.length > 0) {
      const current = checkNext.shift();
      for (const cardinal of cardinals) {
        const dest = [current[0] + cardinal[0], current[1] + cardinal[1]];
        const destStr = dest.join(",");
        if (
          dest[0] >= 0 &&
          dest[1] >= 0 &&
          dest[0] < input[0].length &&
          dest[1] < input.length &&
          input[dest[1]][dest[0]] !== "#" &&
          !reached.includes(destStr)
        ) {
          reached.push(destStr);
        }
      }
    }
  }

  return reached.length;
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
