const part1 = (input) => {
  const split = input.indexOf("");
  const pipes = input.slice(0, split).reduce((pipes, pipe) => {
    const [key, instructions] = pipe.split("{");
    pipes[key] = instructions.replace("}", "").split(",");
    return pipes;
  }, {});
  const parts = input.slice(split + 1);
  let totalRatings = 0;

  const processPart = (pipe, part) => {
    const instructions = pipes[pipe];

    for (const step of instructions) {
      const processMatch = step.match(/(^[xmas])([<>])(\d+):(\w+)$/);
      if (processMatch) {
        const [_, key, operator, value, output] = processMatch;
        const parsedValue = parseInt(value);
        if (
          (operator === "<" && part[key] < parsedValue) ||
          (operator === ">" && part[key] > parsedValue)
        ) {
          return output;
        }
      } else {
        return step;
      }
    }
    return "in";
  };

  for (const rawPart of parts) {
    const part = JSON.parse(
      rawPart
        .replaceAll("=", ":")
        .replaceAll(/[xmas]/g, (match) => `"${match}"`),
    );
    let currentPipe = "in";

    while (currentPipe) {
      currentPipe = processPart(currentPipe, part);
      if (currentPipe === "R") break;
      if (currentPipe === "A") {
        totalRatings += Object.values(part).reduce(
          (total, value) => total + value,
          0,
        );
        break;
      }
    }
  }

  return totalRatings;
};

const part2 = (input) => {
  const pipes = input.slice(0, input.indexOf("")).reduce((pipes, pipe) => {
    const [key, instructions] = pipe.split("{");
    pipes[key] = instructions.replace("}", "").split(",");
    return pipes;
  }, {});
  const validRanges = [];

  let checkPipes = [
    ["in", { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }],
  ];

  while (checkPipes.length) {
    const pipe = checkPipes.shift();
    const instructions = pipes[pipe[0]];
    const ranges = pipe[1];

    for (const step of instructions) {
      const stepRanges = { ...ranges };
      const processMatch = step.match(/(^[xmas])([<>])(\d+):(\w+)$/);
      if (processMatch) {
        const [_, key, operator, rawValue, output] = processMatch;
        const value = parseInt(rawValue);
        if (operator === "<") {
          stepRanges[key] = [stepRanges[key][0], value - 1];
          ranges[key] = [value, ranges[key][1]];
        } else {
          stepRanges[key] = [value + 1, stepRanges[key][1]];
          ranges[key] = [ranges[key][0], value];
        }
        if (output === "A") {
          validRanges.push([stepRanges, pipe[0]]);
        } else if (output !== "R") {
          checkPipes.push([output, stepRanges]);
        }
      } else if (step === "A") {
        validRanges.push([stepRanges, pipe[0]]);
      } else if (step !== "R") {
        checkPipes.push([step, stepRanges]);
      }
    }
  }

  return validRanges.reduce(
    (total, ranges) =>
      total +
      Object.values(ranges[0]).reduce(
        (rangeTotal, bounds) => rangeTotal * (bounds[1] - bounds[0] + 1),
        1,
      ),
    0,
  );
};

module.exports = {
  part1,
  part2,
};
