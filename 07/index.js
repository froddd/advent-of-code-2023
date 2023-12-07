const sortHandsAndGetTotal = (hands, values) =>
  hands
    .sort((a, b) => {
      // sort from low to high on score first
      if (a.score !== b.score) return a.score - b.score;
      // if score is same, sort based on each card
      for (let i = 0; i < 5; i++) {
        if (a.cards[i] !== b.cards[i]) {
          return values[a.cards[i]] - values[b.cards[i]];
        }
      }
    })
    .reduce((total, hand, index) => total + hand.bet * (index + 1), 0);

const part1 = (input) => {
  const values = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const hands = input.map((hand) => {
    const [cards, bet] = hand.split(" ");
    const breakdown = cards.split("").reduce((value, card) => {
      if (!value[card]) value[card] = 0;
      value[card] += 1;
      return value;
    }, {});
    const score = parseInt(
      Object.values(breakdown).sort().reverse().join("").padEnd(5, "0"),
    );
    return {
      cards,
      bet: parseInt(bet),
      score,
    };
  });

  return sortHandsAndGetTotal(hands, values);
};

const part2 = (input) => {
  const values = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 1,
    Q: 12,
    K: 13,
    A: 14,
  };

  const hands = input.map((hand) => {
    const [cards, bet] = hand.split(" ");
    const breakdown = cards.split("").reduce((value, card) => {
      if (!value[card]) value[card] = 0;
      value[card] += 1;
      return value;
    }, {});
    let jokerCount = 0;
    if (breakdown.J) {
      jokerCount = breakdown.J;
      delete breakdown.J;
    }
    const sortedBreakdown = Object.values(breakdown).sort().reverse();
    sortedBreakdown[0] += jokerCount;
    const score =
      jokerCount === 5
        ? 50000
        : parseInt(sortedBreakdown.join("").padEnd(5, "0"));
    return {
      cards,
      bet: parseInt(bet),
      score,
    };
  });

  return sortHandsAndGetTotal(hands, values);
};

module.exports = {
  part1,
  part2,
};
