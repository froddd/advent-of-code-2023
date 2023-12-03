const part1 = input => {
    const symbols = input.reduce((symbols, line, y) => {
        const symbolRegex = new RegExp('[^.0-9]', 'g');
        const newSymbols = [];
        while (symbolRegex.exec(line) !== null) {
            newSymbols.push([symbolRegex.lastIndex - 1, y]);
        }
        return [...symbols, ...newSymbols];
    }, [])

    return input.reduce((total, line, index) => {
        let lineTotal = 0;
        const partNumberRegex = new RegExp('[0-9]+', 'g');
        let match;
        while ((match = partNumberRegex.exec(line)) !== null) {
            const partNumber = match[0];
            const start = match.index;
            const end = match.index + partNumber.length - 1;
            const adjacentSymbol = symbols.find(symbol => (
                symbol[0] >= start - 1
                && symbol[0] <= end + 1
                && symbol[1] >= index - 1
                && symbol[1] <= index + 1)
            )
            if (adjacentSymbol) {
                lineTotal += parseInt(partNumber);
            }
        }

        return total + lineTotal;
    }, 0)
}

const part2 = input => {
    const gears = input.reduce((gears, line, y) => {
        const gearRegex = new RegExp('\\*', 'g');
        const newGears = [];
        while (gearRegex.exec(line) !== null) {
            newGears.push({ position: [gearRegex.lastIndex - 1, y], adjacentParts: []});
        }
        return [...gears, ...newGears];
    }, [])

    input.forEach((line, index) => {
        let lineTotal = 0;
        const partNumberRegex = new RegExp('[0-9]+', 'g');
        let match;
        while ((match = partNumberRegex.exec(line)) !== null) {
            const partNumber = match[0];
            const start = match.index;
            const end = match.index + partNumber.length - 1;
            const adjacentGear = gears.find(({ position }) => (
                position[0] >= start - 1
                && position[0] <= end + 1
                && position[1] >= index - 1
                && position[1] <= index + 1)
            )
            if (adjacentGear) {
                adjacentGear.adjacentParts.push(partNumber)
            }
        }
    })

    return gears.filter(gear => gear.adjacentParts.length === 2).reduce((total, gear) => {
        return total + gear.adjacentParts[0] * gear.adjacentParts[1];
    }, 0);
}

module.exports = {
    part1,
    part2
}