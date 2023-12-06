const part1 = (input) => {
  const times = input[0].split(/\s+/g).slice(1).map(Number);
  const distances = input[1].split(/\s+/g).slice(1).map(Number);

  let winScore = 1;

  for (let i = 0; i < times.length; i++) {
    let winning = 0;

    for (let j = 0; j < times[i]; j++) {
      if ((times[i] - j) * j > distances[i]) {
        winning++;
      }
    }

    winScore *= winning;
  }

  return winScore;
};

const part2 = (input) => {
  const time = parseInt(input[0].replace("Time:", "").replaceAll(/\s/g, ""));
  const distance = parseInt(
    input[1].replace("Distance:", "").replaceAll(/\s/g, ""),
  );

  let winning = 0;

  for (let j = 0; j < time; j++) {
    if ((time - j) * j > distance) {
      winning++;
    }
  }

  return winning;
};

module.exports = {
  part1,
  part2,
};
