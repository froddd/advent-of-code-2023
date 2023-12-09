const getSubSequences = (line) => {
  const subSequences = [line.split(" ").map(Number)];

  while (!subSequences[subSequences.length - 1].every((value) => value === 0)) {
    const subSequence = subSequences[subSequences.length - 1];
    const nextSubSequence = [];

    for (let j = 0; j < subSequence.length - 1; j++) {
      nextSubSequence.push(subSequence[j + 1] - subSequence[j]);
    }

    subSequences.push(nextSubSequence);
  }

  return subSequences;
};

const part1 = (input) => {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const subSequences = getSubSequences(input[i]);

    let next = 0;

    for (let j = subSequences.length - 1; j > 0; j--) {
      total += next + subSequences[j - 1].slice(-1)[0];
    }
  }

  return total;
};

const part2 = (input) => {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const subSequences = getSubSequences(input[i]);

    let next = 0;

    for (let j = subSequences.length - 1; j > 0; j--) {
      next = subSequences[j - 1][0] - next;
    }

    total += next;
  }

  return total;
};

module.exports = { part1, part2 };
