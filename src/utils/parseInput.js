export const parseInput = (input) => {
  const [command, ...other] = input.split(" ");

  const { options, args } = other.reduce((acc, el) => {
    if (!Boolean(el)) return acc;

    if (el.startsWith("--")) {
      acc.options ??= [];
      acc.options.push(el);
    } else {
      acc.args ??= [];
      acc.args.push(el);
    }
    return acc;
  }, {});

  return { command, options, args };
};
