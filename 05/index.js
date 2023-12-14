const getMaps = (input) =>
  input.reduce((maps, line) => {
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

const mapSeed = (seed, maps) => {
  let value = seed;

  maps.forEach((map) => {
    const translator = map.find((x) => x[1] <= value && x[1] + x[2] >= value);

    if (translator) {
      value += translator[0] - translator[1];
    }
  });

  return value;
};

const mapSeeds = (seeds, maps) => seeds.map((seed) => mapSeed(seed, maps));

const part1 = (input) => {
  const startSeeds = input
    .shift()
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

  const maps = getMaps(input);
  const endSeeds = mapSeeds(startSeeds, maps);

  return Math.min(...endSeeds);
};

const part2 = (input) => {
  const seedRanges = input
    .shift()
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

  let lowestEndSeed = Infinity;
  let processedSeeds = 0;

  const maps = getMaps(input);

  for (let i = 0; i < seedRanges.length; i += 2) {
    console.log(`Range size: ${seedRanges[i + 1]}`);
    for (let j = 0; j < seedRanges[i + 1]; j++) {
      const value = mapSeed(seedRanges[i] + j, maps);

      if (value < lowestEndSeed) lowestEndSeed = value;
      processedSeeds++;
    }
  }

  console.log(`Total seeds processed: ${processedSeeds}`);
  return lowestEndSeed;
};

module.exports = {
  part1,
  part2,
};
