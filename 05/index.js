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

const seedExists = (seed, seedRanges) =>
  seedRanges.find((range) => seed >= range[0] && seed <= range[1]);

const part2 = (input) => {
  const seedRangesRaw = input
    .shift()
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

  const seedRanges = [];

  for (let i = 0; i < seedRangesRaw.length; i += 2) {
    seedRanges.push([
      seedRangesRaw[i],
      seedRangesRaw[i] + seedRangesRaw[i + 1],
    ]);
  }

  const reversedMaps = getMaps(input).reverse();

  // Reverse the problem: go from location 0 and see if we can find a matching seed by incrementing...
  let location = 0;
  let found = false;

  while (!found) {
    const seed = reversedMaps.reduce((seed, maps) => {
      const matchingMap = maps.find(
        (map) => map[0] <= seed && map[0] + map[2] >= seed,
      );
      if (matchingMap) {
        return seed + (matchingMap[1] - matchingMap[0]);
      }
      return seed;
    }, location);

    if (seedExists(seed, seedRanges)) {
      break;
    }

    location++;
  }

  return location;
};

module.exports = {
  part1,
  part2,
};
