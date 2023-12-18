const getVisitedKey = (pos) =>
  [pos.x, pos.y, pos.xDir, pos.yDir, pos.streak].join(",");

const getTotalHeat = (input, minSteps, maxSteps) => {
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

  const checkVisited = (pos) => {
    const key = getVisitedKey(pos);
    if (visited.has(key)) return true;
    if (minSteps > 0 && pos.streak >= minSteps) {
      for (let i = 0; i <= maxSteps - pos.streak; ++i)
        visited.set(getVisitedKey({ ...pos, streak: pos.streak + 1 }), true);
    } else {
      visited.set(key, true);
    }
    return false;
  };

  const tryNeighbour = (positions, current, xDir, yDir) => {
    const newX = current.x + xDir;
    const newY = current.y + yDir;
    const sameDir = xDir === current.xDir && yDir === current.yDir;

    // Out of bounds
    if (newX < 0 || newX > end[0] || newY < 0 || newY > end[1]) {
      return;
    }
    // Back on itself
    if (xDir === -current.xDir && yDir === -current.yDir) {
      return;
    }
    // Too long a streak
    if (sameDir && current.streak === maxSteps) {
      return;
    }
    // Too short a streak, no turn allowed (but ignore for start position!)
    if (
      !(current.x === 0 && current.y === 0) &&
      current.streak < minSteps &&
      !sameDir
    )
      return;

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

    if (checkVisited(current)) continue;
    if (
      current.x === end[0] &&
      current.y === end[1] &&
      current.streak >= minSteps
    ) {
      return current.heat;
    }

    tryNeighbour(positions, current, 1, 0);
    tryNeighbour(positions, current, -1, 0);
    tryNeighbour(positions, current, 0, 1);
    tryNeighbour(positions, current, 0, -1);
  }
};

const part1 = (input) => getTotalHeat(input, 0, 3);

const part2 = (input) => getTotalHeat(input, 4, 10);

module.exports = {
  part1,
  part2,
};
