export const sleep = async (duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
