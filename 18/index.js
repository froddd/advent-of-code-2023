function area(polygon) {
  let total = 0;
  for (let i = 0; i < polygon.length; i++) {
    const addX = polygon[i][0];
    const addY = polygon[i === polygon.length - 1 ? 0 : i + 1][1];
    const subX = polygon[i === polygon.length - 1 ? 0 : i + 1][0];
    const subY = polygon[i][1];
    total += addX * addY * 0.5 - subX * subY * 0.5;
  }
  return Math.abs(total);
}

const directions = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
};

const part1 = (input) => {
  let borderLength = 0;
  let current = [0, 0];
  const polygon = [current.slice()];

  for (const line of input) {
    const [direction, lengthStr] = line.split(" ");
    const multipliers = directions[direction];
    const length = parseInt(lengthStr);
    borderLength += length;
    current = current.slice();
    [0, 1].forEach((index) => {
      if (multipliers[index] !== 0) {
        current[index] += length * multipliers[index];
      }
    });
    polygon.push(current);
  }

  return area(polygon) + borderLength / 2 + 1;
};

const part2 = (input) => {
  let borderLength = 0;
  let current = [0, 0];
  const polygon = [current.slice()];

  const directionsAsNums = ["R", "D", "L", "U"];

  for (const line of input) {
    const [_, distanceHex, direction] = line.match(/#(\w{5})(\w)\)$/);
    const distance = parseInt(distanceHex, 16);
    const multipliers = directions[directionsAsNums[direction]];
    borderLength += distance;
    current = current.slice();
    [0, 1].forEach((index) => {
      if (multipliers[index] !== 0) {
        current[index] += distance * multipliers[index];
      }
    });
    polygon.push(current);
  }

  return area(polygon) + borderLength / 2 + 1;
};

module.exports = {
  part1,
  part2,
};
