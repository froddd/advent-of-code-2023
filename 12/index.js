const totalMatchingSolutions = (pattern, blocks) => {
  let matchingPatterns = 0;

  const unknownSprings = [...pattern.matchAll(/\?/g)].map((m) => m.index);

  for (let bits = 0; bits < 1 << unknownSprings.length; bits++) {
    let i = 0;
    const testPattern = pattern.replace(/\?/g, () => ".#"[(bits >> i++) & 1]);
    const testPatternBlocks = testPattern
      .replaceAll(".", " ")
      .trim()
      .split(/\s+/)
      .map((x) => x.length)
      .join(",");

    if (testPatternBlocks === blocks) matchingPatterns += 1;
  }

  return matchingPatterns;
};

const part1 = (input) =>
  input.reduce((total, line) => {
    const [pattern, blocks] = line.split(" ");

    return total + totalMatchingSolutions(pattern, blocks);
  }, 0);

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
