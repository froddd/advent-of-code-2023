const hash = (string) =>
  [...string].reduce(
    (value, char) => ((value + char.charCodeAt(0)) * 17) % 256,
    0,
  );

const part1 = (input) =>
  input[0].split(",").reduce((total, step) => total + hash(step), 0);

const part2 = (input) => {
  const boxes = Array(256);
  input[0].split(",").forEach((step) => {
    const label = step.match(/^[a-z]+/)[0];
    const boxNumber = hash(label);

    if (!boxes[boxNumber]) boxes[boxNumber] = new Map();

    if (step.includes("-")) {
      boxes[boxNumber].delete(label);
    } else {
      const value = Number(step.split("=")[1]);
      boxes[boxNumber].set(label, value);
    }
  });

  return boxes.reduce(
    (total, box, boxIndex) =>
      total +
      Array.from(box.entries())
        .map((x) => x[1])
        .reduce(
          (boxTotal, lensValue, lensIndex) =>
            boxTotal + (boxIndex + 1) * (lensIndex + 1) * lensValue,
          0,
        ),
    0,
  );
};

module.exports = {
  part1,
  part2,
};
