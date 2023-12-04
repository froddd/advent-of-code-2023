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

const part2 = input => {};

module.exports = {
    part1, part2
}