const part1 = input => input.reduce((total, line) => {
    const [_, gameId, draws] = line.match(/Game (\d+): (.*)$/)
    if (draws.split(/[,;]/g).some(draw => {
        const [count, colour] = draw.trim().split(' ')
        const counted = parseInt(count)
        return (colour === 'red' && counted > 12) || (colour === 'green' && counted > 13) || (colour === 'blue' && counted > 14);
    })) {
        return total;
    }

    return total + parseInt(gameId);
}, 0)

module.exports = {
    part1
}