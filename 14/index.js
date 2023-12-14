const rotate = (input) =>
  transpose(input).map((line) => [...line].reverse().join(""));

const transpose = (input) =>
  input[0].split("").map((_, colIndex) => {
    return input.map((row) => row[colIndex]).join("");
  });

const rollRocksOnLine = (line) =>
  line
    .split("#")
    .map((block) => {
      if (!block.length) return "";
      const rocks = block.split("O").length - 1;
      return [
        ...Array(block.length - rocks).fill("."),
        ...Array(rocks).fill("O"),
      ].join("");
    })
    .join("#");

const rollRocks = (input) => input.map(rollRocksOnLine);

const part1 = (input) => {
  const rows = input.length;
  const transposed = transpose(input);

  const processed = rollRocks(transposed);

  return transpose(processed).reduce(
    (total, line, index) =>
      total + (line.split("O").length - 1) * (rows - index),
    0,
  );
};

const part2 = (input) => {
  let map = input;
  let cycle = 1;
  let sameCycle = -1;
  const doneCycles = [map.join("")];

  while (cycle <= 1_000_000_000) {
    for (let i = 0; i < 4; i++) {
      map = rotate(map);
      map = rollRocks(map);
    }
    const cycleEnd = map.join("");
    sameCycle = doneCycles.indexOf(cycleEnd);
    doneCycles.push(cycleEnd);
    if (sameCycle !== -1) {
      break;
    }
    cycle++;
  }

  const cycleLength = cycle - sameCycle;
  const similarCycle =
    ((1_000_000_000 - cycle) % cycleLength) - cycleLength + cycle;
  const finalCycle = doneCycles[similarCycle];
  const splitter = new RegExp(`.{${input[0].length}}`, "g");
  const finalMap = finalCycle.match(splitter);

  return finalMap.reduce(
    (total, line, index) =>
      total + (line.split("O").length - 1) * (input.length - index),
    0,
  );
};

module.exports = {
  part1,
  part2,
};
