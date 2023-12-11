const findEmptySpace = (input) => {
  const emptyRows = [];
  const emptyColumns = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i].split("").every((pos) => pos === ".")) {
      emptyRows.push(i);
    }
  }
  for (let i = 0; i < input[0].length; i++) {
    if (input.map((line) => line[i]).every((pos) => pos === ".")) {
      emptyColumns.push(i);
    }
  }

  return [emptyRows, emptyColumns];
};

const expand = (input) => {
  const [emptyRows, emptyColumns] = findEmptySpace(input);

  const universe = input.map((line) => {
    let newLine = line.split("");
    emptyColumns.forEach((col, index) => {
      newLine.splice(col + index, 0, ".");
    });
    return newLine.join("");
  });

  emptyRows.forEach((row, index) => {
    universe.splice(
      row + index,
      0,
      Array(universe[0].length).fill(".").join(""),
    );
  });

  // console.log(universe.join("\n"));

  return universe;
};

const findGalaxies = (universe) => {
  const galaxies = [];

  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === "#") galaxies.push([i, j]);
    }
  }

  // console.log(galaxies);

  return galaxies;
};

const part1 = (input) => {
  const universe = expand(input);
  const galaxies = findGalaxies(universe);

  return galaxies.slice(0, -1).reduce((total, start, index) => {
    galaxies.slice(index + 1).forEach((end) => {
      const distance =
        Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]);
      total += distance;
    });
    return total;
  }, 0);
};

const part2 = (input) => {
  const [emptyRows, emptyColumns] = findEmptySpace(input);
  const galaxies = findGalaxies(input);

  return galaxies.slice(0, -1).reduce((total, start, index) => {
    galaxies.slice(index + 1).forEach((end) => {
      let distance = Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]);
      emptyRows.forEach((row) => {
        if (
          (row > start[0] && row < end[0]) ||
          (row < start[0] && row > end[0])
        )
          distance += 999_999;
      });
      emptyColumns.forEach((col) => {
        if (
          (col > start[1] && col < end[1]) ||
          (col < start[1] && col > end[1])
        )
          distance += 999_999;
      });
      total += distance;
    });
    return total;
  }, 0);
};

module.exports = {
  part1,
  part2,
};
