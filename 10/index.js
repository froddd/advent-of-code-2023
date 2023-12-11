const part1 = (input) => {
  // Find the start
  const startLine = input.find((line) => line.includes("S"));
  const start = [input.indexOf(startLine), startLine.indexOf("S")];

  const heads = [];

  if (start[0] > 0) {
    const north = [start[0] - 1, start[1]];
    const nextHead = input[north[0]][north[1]];
    if ("|7F".includes(nextHead)) heads.push(north);
  }
  if (start[1] < input[0].length - 1) {
    const east = [start[0], start[1] + 1];
    const nextHead = input[east[0]][east[1]];
    if ("-J7".includes(nextHead)) heads.push(east);
  }
  if (start[0] < input.length - 1) {
    const south = [start[0] + 1, start[1]];
    const nextHead = input[south[0]][south[1]];
    if ("|JL".includes(nextHead)) heads.push(south);
  }
  if (start[1] > 0) {
    const west = [start[0], start[1] - 1];
    const nextHead = input[west[0]][west[1]];
    if ("-LF".includes(nextHead)) heads.push(west);
  }

  const visited = ["1,1"];

  const getNext = (coords) => {
    const next = [];
    const symbol = input[coords[0]][coords[1]];
    if ("|7F".includes(symbol)) next.push([coords[0] + 1, coords[1]]);
    if ("|JL".includes(symbol)) next.push([coords[0] - 1, coords[1]]);
    if ("-LF".includes(symbol)) next.push([coords[0], coords[1] + 1]);
    if ("-J7".includes(symbol)) next.push([coords[0], coords[1] - 1]);

    visited.push(`${coords[0]},${coords[1]}`);

    return next.filter(
      (position) => !visited.includes(`${position[0]},${position[1]}`),
    )[0];
  };

  let distance = 1;

  while (heads[0].join(",") !== heads[1].join(",")) {
    heads[0] = getNext(heads[0]);
    heads[1] = getNext(heads[1]);
    distance++;
  }

  return distance;
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
