const memoize = (func) => {
  const stored = new Map();

  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k);
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
};

const countMatchingPatterns = memoize((pattern, blocks) => {
  if (pattern.length === 0) {
    // Got to the end of the line
    if (blocks.length === 0) {
      // No runs left, this is a valid solution
      return 1;
    }
    // Runs left, no dice
    return 0;
  }

  if (blocks.length === 0) {
    // No blocks left
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "#") {
        // found a spring, no dice
        return 0;
      }
    }
    // No spring left, must all be dots left, this is a valid solution
    return 1;
  }

  // Total slots needed for remaining blocks (total + spaces)
  const totalSlots =
    blocks.reduce((total, block) => total + block, 0) + blocks.length - 1;
  if (pattern.length < totalSlots) {
    // The line is not long enough for all blocks, no dice
    return 0;
  }

  if (pattern[0] === ".") {
    // Dot found, slice and continue with rest
    return countMatchingPatterns(pattern.slice(1), blocks);
  }

  if (pattern[0] === "#") {
    const [block, ...rest] = blocks;

    if (pattern[block] === "#") {
      // block is too long, no dice
      return 0;
    }

    for (let i = 0; i < block; i++) {
      // Check each slot
      if (pattern[i] === ".") {
        // Found a dot that should have been a #, no dice
        return 0;
      }
    }

    // Block is valid, check the rest of the pattern
    return countMatchingPatterns(pattern.slice(block + 1), rest);
  }

  if (pattern[0] === "?") {
    return (
      countMatchingPatterns("#" + pattern.slice(1), blocks) +
      countMatchingPatterns("." + pattern.slice(1), blocks)
    );
  }

  console.log("what");
});

const part1 = (input) =>
  input.reduce((total, line) => {
    const [pattern, blocks] = line.split(" ");

    return (
      total + countMatchingPatterns(pattern, blocks.split(",").map(Number))
    );
  }, 0);

const part2 = (input) =>
  input.reduce((total, line) => {
    const [pattern, blocks] = line.split(" ");
    const unfoldedPattern = Array(5).fill(pattern).join("?");
    const unfoldedBlocks = Array(5)
      .fill(blocks)
      .join(",")
      .split(",")
      .map(Number);

    return total + countMatchingPatterns(unfoldedPattern, unfoldedBlocks);
  }, 0);

module.exports = {
  part1,
  part2,
};
