const part1 = (input) => {
  const startSeeds = input
    .shift()
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

  const maps = input.reduce((maps, line) => {
    if (line.match(/map/)) {
      maps.push([]);
      return maps;
    }

    const mapConfig = [...line.matchAll(/\d+/g)].flat().map(Number);

    if (mapConfig.length) {
      maps[maps.length - 1].push(mapConfig);
    }

    return maps;
  }, []);

  const endSeeds = startSeeds.map((seed) => {
    let value = seed;

    maps.forEach((map) => {
      const translator = map.find((x) => x[1] <= value && x[1] + x[2] >= value);

      if (translator) {
        value += translator[0] - translator[1];
      }
    });

    return value;
  });

  return Math.min(...endSeeds);
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
