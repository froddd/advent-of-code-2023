const getNextSteps = ([x, y, from], input) => {
  let nextSteps = [];
  const value = input[y][x];
  if (value === ".") {
    if (from === "t") nextSteps.push([x, y + 1, "t"]);
    if (from === "r") nextSteps.push([x - 1, y, "r"]);
    if (from === "b") nextSteps.push([x, y - 1, "b"]);
    if (from === "l") nextSteps.push([x + 1, y, "l"]);
  }
  if (value === "\\") {
    if (from === "t") nextSteps.push([x + 1, y, "l"]);
    if (from === "r") nextSteps.push([x, y - 1, "b"]);
    if (from === "b") nextSteps.push([x - 1, y, "r"]);
    if (from === "l") nextSteps.push([x, y + 1, "t"]);
  }
  if (value === "/") {
    if (from === "t") nextSteps.push([x - 1, y, "r"]);
    if (from === "r") nextSteps.push([x, y + 1, "t"]);
    if (from === "b") nextSteps.push([x + 1, y, "l"]);
    if (from === "l") nextSteps.push([x, y - 1, "b"]);
  }
  if (value === "|") {
    if (from === "t") nextSteps.push([x, y + 1, "t"]);
    if (from === "b") nextSteps.push([x, y - 1, "b"]);
    if (from === "l" || from === "r")
      nextSteps.push([x, y - 1, "b"], [x, y + 1, "t"]);
  }
  if (value === "-") {
    if (from === "l") nextSteps.push([x + 1, y, "l"]);
    if (from === "r") nextSteps.push([x - 1, y, "r"]);
    if (from === "t" || from === "b")
      nextSteps.push([x - 1, y, "r"], [x + 1, y, "l"]);
  }
  return nextSteps.filter(
    (step) =>
      step[0] >= 0 &&
      step[0] < input[0].length &&
      step[1] >= 0 &&
      step[1] < input.length,
  );
};

const energised = (startX, startY, startDirection, input) => {
  let next = [[startX, startY, startDirection]];
  const visited = [];

  while (next.length) {
    const step = next.pop();
    const key = step.join(",");
    if (visited.includes(key)) continue;
    visited.push(key);

    const nextSteps = getNextSteps(step, input);
    next.push(...nextSteps);
  }

  const energised = [
    ...new Set(
      visited.map((pos) => {
        const [x, y] = pos.split(",");
        return `${x},${y}`;
      }),
    ),
  ];

  return energised.length;
};

const part1 = (input) => energised(0, 0, "l", input);

const part2 = (input) => {
  let maxEnergised = 0;
  for (const direction of ["t", "b"]) {
    for (let i = 0; i < input[0].length; i++) {
      const energisedCount = energised(
        i,
        direction === "t" ? 0 : input.length - 1,
        direction,
        input,
      );
      if (energisedCount > maxEnergised) maxEnergised = energisedCount;
    }
  }
  for (const direction of ["r", "l"]) {
    for (let i = 0; i < input.length; i++) {
      const energisedCount = energised(
        direction === "l" ? 0 : input[0].length - 1,
        i,
        direction,
        input,
      );
      if (energisedCount > maxEnergised) maxEnergised = energisedCount;
    }
  }
  return maxEnergised;
};

module.exports = {
  part1,
  part2,
};
