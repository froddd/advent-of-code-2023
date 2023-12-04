const part1 = input => input.reduce((total, line) => {
    const [winning, drawn] = line.match(/Card\s+\d+: +(.*) \| (.*)/)
        .slice(1, 3)
        .map(nums => nums.split(/\s+/).map(Number));

    const common = winning.filter(number => drawn.includes(number));

    if (!common.length) {
        return total;
    }

    return total + Math.pow(2, common.length -1);
}, 0);

const part2 = input => {
    const cards = input.map(line => {
        const [winning, drawn] = line.match(/Card\s+\d+: +(.*) \| (.*)/)
            .slice(1, 3)
            .map(nums => nums.split(/\s+/).map(Number));

        const common = winning.filter(number => drawn.includes(number));

        // [copies, count of winning numbers]
        return [1, common.length]
    })

    cards.forEach((card, index) => {
        if (card[1] > 0) {
            // For each copy of the card
            for (let i = 0; i < card[0]; i++) {
                // For each winning number
                for (let j = 1; j <= card[1]; j++) {
                    cards[index + j][0]++;
                }
            }

        }
    })

    return cards.reduce((total, card) => total + card[0], 0)
};

module.exports = {
    part1, part2
}