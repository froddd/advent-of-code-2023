const transpose = (input) =>
  input[0].split("").map((_, colIndex) => {
    return input.map((row) => row[colIndex]).join("");
  });

const part1 = (input) => {
  const rows = input.length;
  const transposed = transpose(input);

  const processed = transposed.map((line) => {
    return line
      .split("#")
      .map((block) => {
        if (!block.length) return "";
        const rocks = block.split("O").length - 1;
        return [
          ...Array(rocks).fill("O"),
          ...Array(block.length - rocks).fill("."),
        ].join("");
      })
      .join("#");
  });

  return transpose(processed).reduce(
    (total, line, index) =>
      total + (line.split("O").length - 1) * (rows - index),
    0,
  );
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
