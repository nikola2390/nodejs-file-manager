export const parseInput = (input) => {
  const regex = /"[^"]+"|[^\s]+/g;
  const inputs = input.match(regex).map((item) => item.replace(/"(.+)"/, "$1"));

  if (inputs[0].toLowerCase() === "os") {
    inputs[1] = inputs[1].slice(2);
  }

  return inputs;
};
