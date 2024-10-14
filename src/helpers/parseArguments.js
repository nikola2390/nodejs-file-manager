export const parseArguments = (args) => {
  const parsedArguments = {};

  args
    .slice(2)
    .map((value) => value.slice(2))
    .forEach((arg) => {
      const [argKey, argValue] = arg.split("=");

      parsedArguments[argKey] = argValue;
    });

  return parsedArguments;
};
