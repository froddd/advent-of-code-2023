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
      const processMatch = step.match(/(^[xmas])(<|>)(\d+):(\w+)$/);
      if (processMatch) {
        const [_, key, operator, value, output] = processMatch;
        if (
          (operator === "<" && part[key] < value) ||
          (operator === ">" && part[key] > value)
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

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
