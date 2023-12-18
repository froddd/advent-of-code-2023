const visitedKey = (pos) =>
  [pos.x, pos.y, pos.xDir, pos.yDir, pos.streak].join(",");

const part1 = (input) => {
  const start = [0, 0];
  const end = [input[0].length - 1, input.length - 1];
  const positions = [];
  const visited = new Map();

  positions.push({
    x: start[0],
    y: start[1],
    xDir: 0,
    yDir: 0,
    streak: 0,
    heat: 0,
  });

  const tryNeighbour = (positions, current, xDir, yDir) => {
    const newX = current.x + xDir;
    const newY = current.y + yDir;
    const sameDir = xDir === current.xDir && yDir === current.yDir;

    if (newX < 0 || newX > end[0] || newY < 0 || newY > end[1]) return;
    if (xDir === -current.xDir && yDir === -current.yDir) return;
    if (sameDir && current.streak >= 3) return;

    positions.push({
      x: newX,
      y: newY,
      xDir: xDir,
      yDir: yDir,
      streak: sameDir ? current.streak + 1 : 1,
      heat: current.heat + parseInt(input[newY][newX]),
    });
    positions.sort((a, b) => b.heat - a.heat);
  };

  while (positions.length > 0) {
    const current = positions.pop();
    const visitKey = visitedKey(current);

    if (visited.has(visitKey)) continue;
    visited.set(visitKey, true);
    if (current.x === end[0] && current.y === end[1]) return current.heat;

    tryNeighbour(positions, current, 1, 0);
    tryNeighbour(positions, current, -1, 0);
    tryNeighbour(positions, current, 0, 1);
    tryNeighbour(positions, current, 0, -1);
  }
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
