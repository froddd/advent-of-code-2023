const part1 = input => input.reduce((total, line) => {
    const [_, gameId, draws] = line.match(/Game (\d+): (.*)$/);
    if (draws.split(/[,;]/g).some(draw => {
        const [count, colour] = draw.trim().split(' ');
        const counted = parseInt(count);
        return (colour === 'red' && counted > 12) || (colour === 'green' && counted > 13) || (colour === 'blue' && counted > 14);
    })) {
        return total;
    }

    return total + parseInt(gameId);
}, 0)

const part2 = input => input.reduce((total, line) => {
    const [_, draws] = line.match(/Game \d+: (.*)$/);
    const minimums = {
        red: 0,
        green: 0,
        blue: 0
    };
    draws.split(/[;,]/g).forEach(draw => {
        const [count, colour] = draw.trim().split(' ');
        const counted = parseInt(count);
        if (counted > minimums[colour]) minimums[colour] = counted;
    })
    return total + (minimums.red * minimums.green * minimums.blue);
}, 0)

module.exports = {
    part1,
    part2
}