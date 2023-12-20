const part1 = (input) => {
  const modules = input.reduce((modules, line) => {
    const [def, destinationsRaw] = line.split("->").map((x) => x.trim());
    const destinations = destinationsRaw.split(",").map((x) => x.trim());
    const module = {
      destinations,
    };
    if (def.startsWith("%")) {
      module.type = "flipflop";
      module.on = 0;
    }
    if (def.startsWith("&")) {
      module.type = "conjunction";
      module.inputs = {};
    }
    if (def === "broadcaster") {
      module.type = "broadcaster";
    }
    modules[def.replace(/[%&]/, "")] = module;
    return modules;
  }, {});

  Object.keys(modules).forEach((key) => {
    modules[key].destinations.forEach((dest) => {
      // Destination may not exist...
      if (modules[dest]?.type === "conjunction") {
        modules[dest].inputs[key] = 0;
      }
    });
  });

  const startState = JSON.stringify(modules);

  let lowCount = 0;
  let highCount = 0;

  const pressButton = (modules) => {
    const queue = [["broadcaster", 0, "button"]];
    lowCount++;
    while (queue.length > 0) {
      const queueItem = queue.shift();
      const currentKey = queueItem[0];
      const module = modules[currentKey];
      const pulse = queueItem[1];
      const from = queueItem[2];

      // console.log(`${from} -${pulse === 0 ? "low" : "high"}-> ${currentKey}`);

      if (!module) continue;

      let sendPulse = pulse;

      if (module.type === "flipflop") {
        if (pulse === 1) continue;

        module.on = module.on === 0 ? 1 : 0;
        sendPulse = module.on;
      }

      if (module.type === "conjunction") {
        module.inputs[from] = pulse;
        sendPulse = Object.values(module.inputs).every((x) => x === 1) ? 0 : 1;
      }

      for (const destination of module.destinations) {
        queue.push([destination, sendPulse, currentKey]);
        if (sendPulse === 1) {
          highCount++;
        } else {
          lowCount++;
        }
      }
    }
  };

  let i = 0;

  while (i < 1000) {
    i++;
    pressButton(modules);

    const state = JSON.stringify(modules);
    if (state === startState) {
      console.log(`Back to start state in ${i} cycles`);
      break;
    }
  }

  return (1000 / i) * lowCount * (1000 / i) * highCount;
};

const part2 = (input) => {};

module.exports = {
  part1,
  part2,
};
