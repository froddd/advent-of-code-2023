const part1 = (input) => {
  const pattern = input[0];
  const maps = input.slice(2).reduce((maps, line) => {
    const matches = line.match(/^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)$/);
    maps[matches[1]] = { L: matches[2], R: matches[3] };
    return maps;
  }, {});

  let currentMapIndex = "AAA";
  let currentPatternIndex = 0;
  let steps = 0;

  while (currentMapIndex !== "ZZZ") {
    const leftRight = pattern[currentPatternIndex];

    currentMapIndex = maps[currentMapIndex][leftRight];

    currentPatternIndex++;

    if (currentPatternIndex >= pattern.length) currentPatternIndex = 0;

    steps++;
  }

  return steps;
};

const part2 = (input) => {
  function LCM(arr) {
    function gcd(a, b) {
      if (b === 0) return a;
      return gcd(b, a % b);
    }

    let res = arr[0];

    for (let i = 1; i < arr.length; i++) {
      res = (res * arr[i]) / gcd(res, arr[i]);
    }

    return res;
  }

  const pattern = input[0];
  const maps = input.slice(2).reduce((maps, line) => {
    const matches = line.match(
      /^([A-Z1-9]{3}) = \(([A-Z1-9]{3}), ([A-Z1-9]{3})\)$/,
    );
    maps[matches[1]] = { L: matches[2], R: matches[3] };
    return maps;
  }, {});

  let currentMapIndexes = Object.keys(maps).filter((key) => key.endsWith("A"));
  const steps = [];

  for (let i = 0; i < currentMapIndexes.length; i++) {
    let currentPatternIndex = 0;
    let indexSteps = 0;

    while (!currentMapIndexes[i].endsWith("Z")) {
      const leftRight = pattern[currentPatternIndex];

      currentMapIndexes[i] = maps[currentMapIndexes[i]][leftRight];

      currentPatternIndex++;

      if (currentPatternIndex >= pattern.length) currentPatternIndex = 0;

      indexSteps++;
    }

    steps.push(indexSteps);
  }

  return LCM(steps);
};

module.exports = {
  part1,
  part2,
};
