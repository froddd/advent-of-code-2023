const checkLineSymmetry = (line, index) => {
  let isAxis = true;

  const left = line.slice(0, index);
  const right = line.slice(index);

  let j = 0;
  while (j < Math.min(left.length, right.length)) {
    if (left[left.length - j - 1] !== right[j]) {
      isAxis = false;
      break;
    }
    j++;
  }

  return isAxis;
};

const findValidPatternAxis = (pattern) => {
  const axes = findLineAxes(pattern[0]);
  let axesIndex = 0;

  while (axesIndex < axes.length) {
    let validAxis = true;
    let lineIndex = 1;

    while (lineIndex < pattern.length) {
      if (!checkLineSymmetry(pattern[lineIndex], axes[axesIndex])) {
        validAxis = false;
        break;
      }
      lineIndex++;
    }
    if (validAxis) break;
    axesIndex++;
  }

  return axes[axesIndex];
};

const findLineAxes = (pattern) => {
  let axes = [];

  for (let i = 1; i < pattern.length; i++) {
    if (checkLineSymmetry(pattern, i)) {
      axes.push(i);
    }
  }

  return axes;
};

const part1 = (input) => {
  // split into patterns
  const patterns = input.reduce((patterns, line) => {
    if (line === "" || !patterns.length) patterns.push([]);
    if (line !== "") patterns[patterns.length - 1].push(line);
    return patterns;
  }, []);

  return patterns.reduce((total, pattern) => {
    // Find axes of symmetry on line 1
    const validVerticalAxis = findValidPatternAxis(pattern);

    if (validVerticalAxis) return total + validVerticalAxis;

    const transposed = pattern[0].split("").map((_, colIndex) => {
      return pattern.map((row) => row[colIndex]).join("");
    });
    const validHorizontalAxis = findValidPatternAxis(transposed);

    return total + validHorizontalAxis * 100;
  }, 0);
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
