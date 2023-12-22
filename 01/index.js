const part1 = (input) => input.reduce((total, line) => {
    const lineNumber = line.replace(/\D/g, '');
    const lineTotal = parseInt(lineNumber.slice(0, 1) + lineNumber.slice(-1));
    return total + lineTotal;
}, 0)

const digits = {
    one: 'o1ne',
    two: 't2wo',
    three: 't3hree',
    four: 'f4our',
    five: 'f5ive',
    six: 's6ix',
    seven: 's7even',
    eight: 'e8ight',
    nine: 'n9ine'
}

const replaceLiteralDigits = (line) => {
    let replacedLine = line;
    Object.keys(digits).forEach(number => {
        replacedLine = replacedLine.replaceAll(number, digits[number])
    })
    return replacedLine;
}

const part2 = (input) => input.reduce((total, line) => {
    const lineNumber = replaceLiteralDigits(line).replace(/\D/g, '');
    const lineTotal = parseInt(`${lineNumber.slice(0, 1)}${lineNumber.slice(-1)}`);
    return total + lineTotal;
}, 0)

module.exports = {
    part1,
    part2
}