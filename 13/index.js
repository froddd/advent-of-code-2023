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

const findValidPatternAxis = (pattern, axes) => {
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

const getPatterns = (input) =>
  input.reduce((patterns, line) => {
    if (line === "" || !patterns.length) patterns.push([]);
    if (line !== "") patterns[patterns.length - 1].push(line);
    return patterns;
  }, []);

const part1 = (input) =>
  getPatterns(input).reduce((total, pattern) => {
    const axes = findLineAxes(pattern[0]);
    const validVerticalAxis = findValidPatternAxis(pattern, axes);

    if (validVerticalAxis) return total + validVerticalAxis;

    const transposed = pattern[0].split("").map((_, colIndex) => {
      return pattern.map((row) => row[colIndex]).join("");
    });
    const horizontalAxes = findLineAxes(transposed[0]);
    const validHorizontalAxis = findValidPatternAxis(
      transposed,
      horizontalAxes,
    );

    return total + validHorizontalAxis * 100;
  }, 0);

const part2 = (input) =>
  getPatterns(input).reduce((total, pattern) => {
    let [x, y] = [0, 0];
    let testPatternTotal = 0;

    // Find the original symmetry axis
    let originalIsVertical = true;
    const originalVerticalAxes = findLineAxes(pattern[0]);
    let originalAxis = findValidPatternAxis(pattern, originalVerticalAxes);
    if (!originalAxis) {
      const transposed = pattern[0].split("").map((_, colIndex) => {
        return pattern.map((row) => row[colIndex]).join("");
      });
      const originalHorizontalAxes = findLineAxes(transposed[0]);
      originalAxis = findValidPatternAxis(transposed, originalHorizontalAxes);
      if (originalAxis) originalIsVertical = false;
    }

    while (x < pattern[0].length && y < pattern.length) {
      const testPattern = pattern.slice();
      const testLine = pattern[y].split("");
      testLine[x] = testLine[x] === "." ? "#" : ".";
      testPattern[y] = testLine.join("");

      let verticalAxes = findLineAxes(testPattern[0]);
      if (originalIsVertical) {
        verticalAxes = verticalAxes.filter((axis) => axis !== originalAxis);
      }
      const validVerticalAxis = findValidPatternAxis(testPattern, verticalAxes);

      if (validVerticalAxis) {
        testPatternTotal = validVerticalAxis;
        break;
      } else {
        const transposed = testPattern[0].split("").map((_, colIndex) => {
          return testPattern.map((row) => row[colIndex]).join("");
        });

        let horizontalAxes = findLineAxes(transposed[0]);
        if (!originalIsVertical) {
          horizontalAxes = horizontalAxes.filter(
            (axis) => axis !== originalAxis,
          );
        }
        const validHorizontalAxis = findValidPatternAxis(
          transposed,
          horizontalAxes,
        );

        if (validHorizontalAxis) {
          testPatternTotal = validHorizontalAxis * 100;
          break;
        }
      }

      x++;
      if (x === pattern[0].length) {
        x = 0;
        y++;
      }
    }

    return total + testPatternTotal;
  }, 0);

module.exports = {
  part1,
  part2,
};
